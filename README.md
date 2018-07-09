# tera-notifier
A watered down version of node-notifier. Allows modules to use windows Toasts/Balloons for notification purposes.

## Update
For Windows 10 Fall Creators Update (Build 1709 and above):

The new update to node-notifier fixed toast notification issue, but snoretoast have to be run initially when installing this module as a new module or if it has not been run before. You can run snoreToast at `tera-notifier\notifiers\vendor\snoreToast\snoreToast.exe`. Hopefully, there won't be much issues after running it for the first time, and that there is no need to do it multiple times. For those suspicious of running files VirusTotal results are here: https://www.virustotal.com/#/file/9e8016d8552c50db2ed2b5a08a1523a258214d550aa5dd52ce566fd409c72a7e/detection

I have attached a test file, `notifiertest.js` in the folder `tera-notifier\notifiers\test_module`, if you need to test, just drop this file in `bin\node_modules` folder, no need to create a subfolder for it. It will pop up a notification on desktop after logging into the server immediately, while loading the character selection screen.

## General Infomation
> READ THIS: When you Clone and download this module, RENAME the resulting folder to tera-notifier, DO NOT leave as 'tera-notifier-master' OR you can use the release version: https://github.com/SerenTera/tera-notifier/releases

Uses these modules and FULL credits goes to them. I DID NOT make this module, merely edited it a little:
- Commands Module by Pinkie-Pie for the code fragment. https://github.com/pinkipi/command
- Node-notifier - https://github.com/mikaelbr/node-notifier 
- node-notifier Dependencies(pre-included in this version already)
- snoretoast - https://github.com/KDE/snoretoast
- notifu - https://www.paralint.com/projects/notifu/
- Full list of original documentations can be derived from original docs file

## User Config
Edit config.json for user configs. Do not touch anything else.
- `notifierType`: The type of notification to use. USE ONLY `balloon` OR `toast` as the type, default is `toast`. Balloon is the old type of notifcation seen in Windows XP and below, but you can use this if toast fails.
- `AFK_TIMEOUT`: The timeout, in milseconds, to check for player inactivity for afk type notifications.

## Quick start example for writing:

#### Easy way to use
Similar to command module, simply use `.message()` or `.messageafk()` methods as examplified below:
```
const Notifier=require('tera-notifier')
	
module.exports = function myMod(dispatch) {	
    const notifier = Notifier(dispatch)	
    
    notifier.message('Hello world! uwu owo')  //standard instant notification
    
    notifier.messageafk('Hello world! uwu owo') //checks for afk status before notifying
}
```
- `.message('message')` : Instantly sends a notification upon being called. Default with sound and tera logo, notification is titled 'TERA'.
- `.messageafk('message')` : Checks for afk status before sending a notification upon being called. Default with sound and tera logo, notification is titled 'TERA'.

#### Complex methods for toast (Win 8.1/10)
```
const Notifier=require('tera-notifier'), //important
	path=require('path')		//Only if you intend to have custom icon
	
module.exports = function myMod(dispatch) {	
    const notifier = Notifier(dispatch)	//Important


    notifier.notify({
		title: 'Tera notify',
		message: 'Party message:VHHM>H/D Leader:xaxaxa(3/5)',
		icon: path.join(__dirname,'tera.png'), //Optional. Use absolute path. If not used, there will be a default tera logo.
		wait:false, //False= do not wait for response, time out on its own. True= stay around until 'remove' property is called or user closes it.
		sound:'Notification.IM', //Or use true for default sound. Or use false for silence.
		id:1, //Useful to remove the previous notifcation when you code. Refer to this id when you call 'remove' property
     })
}
  ```
  
Output:

![Output](http://i.imgur.com/HOHMfgf.jpg)  

#### Complex method for afk notification
You can also use `notifier.notifyafk({.........},afk_timeout)` instead to notify only if the user is deemed to be afk. Very useful if notification is not too be spammed when the user is actively playing (moving,chatting,searching broker,using skills,loading new map).However, non-standard method of determining afk state is used and is untested, thus, do not rely on this if possible.

'afk_timeout' is the time in milsec to check whether someone is afk. By default, it is 1min (60000ms) if there is NO input (ie. leaving the afk_timeout argument blank). Example, this sets a function to notify only if the user is detected to be afk for more than 30sec:
```
notifier.notifyafk({
		title: 'Tera notify',
		message: 'Party message:VHHM>H/D Leader:xaxaxa(3/5)',
		icon: path.join(__dirname,'tera.png'), //optional and use absolute path. If not used, there will be a default tera logo.
		wait:false, //False= do not wait for response, time out on its own. True= stay around until 'remove' property is called or user closes it.
		sound:'Notification.IM', //Or use true for default sound. Or use false for silence.
		id:1, //useful to remove the previous notifcation when you code. Refer to this id when you call 'remove' property
	},30000)
```

Refer to 'Relavant guide part from Original readme' section for all available properties you can use to craft the notification

#### For windows 7 and below
Because windows 7 does not support toast notification, balloon notification is the fallback. Thus, when using toast notification properties in you code might cause some of them to not appear when balloon notification is used as fallback on users with win7 OS. However, message, title, sound will still be around, which isn't too bad.
  

## Changes from node-notifier
- Removed examples and test folders
- Removed linux and OSx (mac) OS notifications capability (Since tera does not use it?). Commented out in index.js
- Removed Linux/OSx notification scripts
- Added dependencies to its own folder and edited the coressponding .requires() 
- Removed 'which' dependency since it is for Linux notifier only.
- Reworked index.js, reorganised file structure so that it can work with TERA Proxy without conflicts.
- Added afk detection functionality. Not tested fully.

## ToDo
- Debugging (probably has alot of bugs)
- See whether it is possible to detect window state of Tera (Minimise/maximised) and automatically shut off notification based on that. Would also allow notification only if windows is minimised, instead of using such a complicated method of determining afk status
- clean up the codes
## Bugs
- remove object property does not work well yet. Try not to use this anyway

