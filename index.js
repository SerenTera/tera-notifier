const Notifier=require('./notifiers/notify')
	path=require('path'),
	decodehtml=require('./decodeHTML')

//List of raw packets to check for afk status
const packetcheck=[
'C_CHAT',
'C_PLAYER_LOCATION',
'C_TRADE_BROKER_WAITING_ITEM_LIST_NEW',
'C_START_SKILL',
'C_WHISPER',
'S_LOAD_TOPO',
'C_NPC_CONTACT',
'S_TRADE_BROKER_HISTORY_ITEM_LIST',
'C_TRADE_BROKER_REGISTERED_ITEM_LIST'
]

//Defaults:
const AFK_TIMEOUT=60000 //default timeout if afktimeout is not defined.

let afktime=0,			//Set to false always.
	time=Date.now(), 	//time=last active detected time
	iconfile='tera.png',//File name of the icon file to use for notification. Put file at tera-notifier base path. ie: tera-proxy/bin/node-modules/tera-notifier/tera.png for example.
						//File must be png and cannot exceed 1024x1024 px, or over over 200Kb.

	debug=false		//debug




module.exports = function notifier(dispatch) {
	
	
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

/////Exports
	this.notifyafk = function(args,afktimeout){
		if(afktimeout===undefined || isNaN(afktimeout)) {
			afktimeout=AFK_TIMEOUT
			console.log('timeout used for notifier.notifyafk is undefined/NaN. Set to default timeout')
		}
		
		if(afktime < parseInt(afktimeout)) return
		
		else {
			if(!args.icon) args.icon=path.join(__dirname,iconfile)
		
			args.message = decodehtml.decodeHTMLEntities(args.message)
			Notifier.notify(args)
		}
	}

	this.notify = function(args){
		if(!args.icon) args.icon=path.join(__dirname,iconfile)
			
		args.message = decodehtml.decodeHTMLEntities(args.message)	
		Notifier.notify(args)
	}
	
}
