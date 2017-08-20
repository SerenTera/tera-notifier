const Notifier=require('./notifiers/notify')
	path=require('path'),
	decodehtml=require('./decodeHTML')

//Defaults:
const AFK_TIMEOUT=120000 //Time interval to detect when defining the 'afk' status (default 2min)

let afk=false,			//Set to false always.
	time=Date.now(), 	//time=last active detected time
	iconfile='tera.png',//File name of the icon file to use for notification. Put file at tera-notifier base path. ie: tera-proxy/bin/node-modules/tera-notifier/tera.png for example.
						//File must be png and cannot exceed 1024x1024 px, or over over 200Kb.

	debug=false		//debug




module.exports = function notifier(dispatch) {
	
/////Dispatches
	dispatch.hook('C_CHAT', 'raw', {filter:{fake:false}}, () => { //chat
		afk=false
		time=Date.now()
		if(debug) console.log(afk)
	})
	
	dispatch.hook('C_PLAYER_LOCATION','raw',{filter:{fake:false}}, () => { //movement
		afk=false
		time=Date.now()
		if(debug) console.log(afk)
	})
	
	dispatch.hook('C_TRADE_BROKER_WAITING_ITEM_LIST_NEW','raw',{filter:{fake:false}}, () => { //searching for broker doing broker stuff
		afk=false
		time=Date.now()
		if(debug) console.log(afk)
	})
	
	dispatch.hook('C_START_SKILL','raw',{filter:{fake:false}}, () => { //skill use
		afk=false
		time=Date.now()
		if(debug) console.log(afk)
	})
	
	dispatch.hook('C_WHISPER','raw',{filter:{fake:false}}, () => { //whispers
		afk=false
		time=Date.now()
		if(debug) console.log(afk)
	})
	
	dispatch.hook('S_LOAD_TOPO','raw',{filter:{fake:false}}, () => { //moving to another location
		afk=false
		time=Date.now()
		if(debug) console.log(afk)
	})
	
	dispatch.hook('S_RESPONSE_GAMESTAT_PONG','raw',() => { //Only indicator of afking?
		afk = (Date.now()-time > AFK_TIMEOUT) ? true : false  //time now - last active time > total timeout? true :false
		if(debug) console.log(afk)
	})

/////Exports
	this.notifyafk = function(args){
		if(!args.icon) args.icon=path.join(__dirname,iconfile)
		
		args.message = decodehtml.decodeHTMLEntities(args.message)
		if(afk) Notifier.notify(args)
	}

	this.notify = function(args){
		if(!args.icon) args.icon=path.join(__dirname,iconfile)
			
		args.message = decodehtml.decodeHTMLEntities(args.message)	
		Notifier.notify(args)
	}
	
	
}
