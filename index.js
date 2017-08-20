const Notifier=require('./notifiers/notify')
	path=require('path'),
	decodehtml=require('./decodeHTML')

//Defaults:
const AFK_TIMEOUT=60000 //default timeout if afktimeout is not defined.

let afktime=0,			//Set to false always.
	time=Date.now(), 	//time=last active detected time
	iconfile='tera.png',//File name of the icon file to use for notification. Put file at tera-notifier base path. ie: tera-proxy/bin/node-modules/tera-notifier/tera.png for example.
						//File must be png and cannot exceed 1024x1024 px, or over over 200Kb.

	debug=false		//debug




module.exports = function notifier(dispatch) {
	
/////Dispatches
	dispatch.hook('C_CHAT', 'raw', {filter:{fake:false}}, () => { //chat
		time=Date.now()
		if(debug) console.log(afktime)
	})
	
	dispatch.hook('C_PLAYER_LOCATION','raw',{filter:{fake:false}}, () => { //movement
		time=Date.now()
		if(debug) console.log(afktime)
	})
	
	dispatch.hook('C_TRADE_BROKER_WAITING_ITEM_LIST_NEW','raw',{filter:{fake:false}}, () => { //searching for broker doing broker stuff
		time=Date.now()
		if(debug) console.log(afktime)
	})
	
	dispatch.hook('C_START_SKILL','raw',{filter:{fake:false}}, () => { //skill use
		time=Date.now()
		if(debug) console.log(afktime)
	})
	
	dispatch.hook('C_WHISPER','raw',{filter:{fake:false}}, () => { //whispers
		time=Date.now()
		if(debug) console.log(afktime)
	})
	
	dispatch.hook('S_LOAD_TOPO','raw',{filter:{fake:false}}, () => { //moving to another location
		time=Date.now()
		if(debug) console.log(afktime)
	})
	
	dispatch.hook('S_RESPONSE_GAMESTAT_PONG','raw',() => { //Only indicator of afking?
		afktime = Date.now()-time
		if(debug) console.log(afktime)
	})

/////Exports
	this.notifyafk = function(args,afktimeout){
		if(afktimeout===undefined) afktimeout=AFK_TIMEOUT
		
		if(afktime<afktimeout) return
		
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
