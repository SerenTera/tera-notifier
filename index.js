const Notifier=require('./notifiers/notify')
	path=require('path')

//Defaults:
const AFK_TIMEOUT=12000 //Time interval to detect when defining the 'afk' status (default 2min)

let afk=false,			//Set to false always.
	time=Date.now(), 	//time=last active detected time
	iconfile='tera.png',//File name of the icon file to use for notification. Put file at tera-notifier base path. ie: tera-proxy/bin/node-modules/tera-notifier/tera.png for example.
						//File must be png and cannot exceed 1024x1024 px, or over over 200Kb.

	debug=false		//debug

	
module.exports = function notifier(dispatch) {
	
/////Dispatches
	dispatch.hook('C_CHAT', 'raw', fake => { //chat
		if(!fake) {
			afk=false
			time=Date.now()
			if(debug) console.log(afk)
		}
	})
	
	dispatch.hook('C_PLAYER_LOCATION','raw',fake => { //movement
		if(!fake) {
			afk=false
			time=Date.now()
			if(debug) console.log(afk)
		}
	})
	
	dispatch.hook('C_TRADE_BROKER_WAITING_ITEM_LIST_NEW','raw',fake => { //searching for broker doing broker stuff
		if(!fake) {
			afk=false
			time=Date.now()
			if(debug) console.log(afk)
		}
	})
	
	dispatch.hook('C_START_SKILL','raw',fake => { //skill use
		if(!fake) {
			afk=false
			time=Date.now()
			if(debug) console.log(afk)
		}
	})
	
	dispatch.hook('C_WHISPER','raw',fake => { //whispers
		if(!fake) {
			afk=false
			time=Date.now()
			if(debug) console.log(afk)
		}
	})
	
	dispatch.hook('S_LOAD_TOPO','raw',fake => { //moving to another location
		if(!fake) {
			afk=false
			time=Date.now()
			if(debug) console.log(afk)
		}
	})
	
	dispatch.hook('S_RESPONSE_GAMESTAT_PONG','raw',() => { //Only indicator of afking?
		afk = (Date.now()-time > AFK_TIMEOUT) ? true : false  //time now - last active time > total timeout? true :false
		if(debug) console.log(afk)
	})

/////Exports
	this.notifyafk = function(args){
		if(!args.icon) args.icon=path.join(__dirname,iconfile)
			
		if(afk) Notifier.notify(args)
	}

	this.notify = function(args){
		if(!args.icon) args.icon=path.join(__dirname,iconfile)
			
		Notifier.notify(args)
	}
	
}
