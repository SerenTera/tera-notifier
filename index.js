const Notifiers=require('./notifiers/notify')
	path=require('path'),
	decodehtml=require('./decodeHTML'),
	AFK_TIMEOUT = require('./config.json').AFK_TIMEOUT 

//List of raw packets to check for afk status
const packetcheck=[
'C_CHAT',
'C_PLAYER_LOCATION',
//'C_TRADE_BROKER_WAITING_ITEM_LIST_NEW',
'C_START_SKILL',
'C_WHISPER',
'S_LOAD_TOPO',
//'C_NPC_CONTACT',
//'S_TRADE_BROKER_HISTORY_ITEM_LIST',
//'C_TRADE_BROKER_REGISTERED_ITEM_LIST'
]

//Defaults:
let afktime=0,			//Set to false always.
	time=Date.now(), 	//time=last active detected time
	iconfile='tera.png',//File name of the icon file to use for notification. Put file at tera-notifier base path. ie: tera-proxy/bin/node-modules/tera-notifier/tera.png for example.
						//File must be png and cannot exceed 1024x1024 px, or over over 200Kb.

	debug=false		//debug




class Notifier {
	constructor(dispatch) {
		this.dispatch = dispatch
		
/////Dispatches
		for(let hook of packetcheck) {
			dispatch.hook(hook,'raw',{filter:{fake:false}}, () => { 
				time=Date.now()
				if(debug) console.log(afktime)
			})
		}

		dispatch.hook('S_RESPONSE_GAMESTAT_PONG','raw',() => { //Only indicator of afking?
			afktime = Date.now()-time
			if(debug) console.log(afktime)
		})
	}
/////Exports
	notifyafk(args,afktimeout) {
		if(afktimeout===undefined || isNaN(afktimeout)) {
			afktimeout=AFK_TIMEOUT
			console.log('timeout used for notifier.notifyafk is undefined/NaN. Set to default timeout')
		}
		
		if(afktime < parseInt(afktimeout)) return
		
		else {
			if(!args.icon) args.icon=path.join(__dirname,iconfile)
		
			args.message = decodehtml.decodeHTMLEntities(args.message)
			Notifiers.notify(args)
		}
	}

	notify(args) {
		if(!args.icon) args.icon=path.join(__dirname,iconfile)
			
		args.message = decodehtml.decodeHTMLEntities(args.message)	
		Notifiers.notify(args)
	}
	
	message(msg) {
		msg = decodehtml.decodeHTMLEntities(msg);
		
		Notifiers.notify({
			title: 'TERA',
			message: msg,
			wait:false, 
			icon:path.join(__dirname,iconfile),
			sound:'Notification.IM', 
		})
	}
	
	messageafk(msg,afktimeout) {
		if(afktimeout===undefined || isNaN(afktimeout)) {
			afktimeout=AFK_TIMEOUT
			console.log('timeout used for notifier.notifyafk is undefined/NaN. Set to default timeout')
		}
		
		if(afktime < parseInt(afktimeout)) return
		
		else {
			msg = decodehtml.decodeHTMLEntities(msg);
			Notifiers.notify({
				title: 'TERA',
				message: msg,
				wait:false, 
				icon:path.join(__dirname,iconfile),
				sound:'Notification.IM', 
			})
		}
	}
}

let nmap = new WeakMap() //Uses Pinkie-Pie's Command's require function, changed some var names because idk if conflicts will occur.(probably not tho)

module.exports = function Require(dispatch) {
	if(nmap.has(dispatch.base)) return nmap.get(dispatch.base)

	let notifier = new Notifier(dispatch)
	nmap.set(dispatch.base, notifier)
	return notifier
}
