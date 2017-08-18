# tera-notifier
A watered down version of node-notifier that is only for Windows. Work in progress

-READ THIS: When you Clone and download this module, RENAME the resulting folder to tera-notifier, DO NOT leave as 'tera-notifier-master'

Uses these modules and FULL credits goes to them. I DID NOT make this module, merely edited it a little:
- Node-notifier - https://github.com/mikaelbr/node-notifier 
- node-notifier Dependencies(pre-included in this version already)
- snoretoast
- notifu
- Full list of original documentations can be derived from original docs file

## Users
In index.js, there is 1 variable that concerns you, that is 'AFK_TIMEOUT' in index.js. By default, 2mins (12000ms) of not  moving,chatting,searching broker,using skills,loading new map is used to determine if someone is afk on tera. Thus, if this is too short/long, you can modify this as you wish.

## Quick start example for module creators:
#### For windows 8.1/10 toast notification:
```
const Notifier=require('tera-notifier'), //important
	path=require('path')		//Only if you intend to have custom icon
	
module.exports = function myMod(dispatch) {	
let notifier = new Notifier(dispatch)	//Important

notifier.notify({
		'title': 'Tera notify',
		'message': 'Party message:VHHM>H/D Leader:xaxaxa(3/5)',
		'icon': path.join(__dirname,'tera.png'), //optional and use absolute path. If not used, there will be a default tera logo.
		'wait':false, //False= do not wait for response, time out on its own. True= stay around until 'remove' property is called or user closes it.
		'sound':'Notification.IM', //Or use true for default sound. Or use false for silence.
		'id':1, //useful to remove the previous notifcation when you code. Refer to this id when you call 'remove' property
	})
}
  ```
  
Output:

![Output](http://i.imgur.com/HOHMfgf.jpg)  


You can also use `notifier.notifyafk({.........})` instead to notify only if the user is deemed to be afk. Very useful if notification is not too be spammed when the user is actively playing (moving,chatting,searching broker,using skills,loading new map).However, non-standard method of determining afk state is used and is untested, thus, do not rely on this if possible.

Refer to 'Relavant guide part from Original readme' section for all available properties you can use to craft the notification

#### For windows 7 and below
Because windows 7 does not support toast notification, balloon notification is the fallback. Thus, when using toast notification properties in you code might cause some of them to not appear when balloon notification is used as fallback on users with win7 OS. However, message, title, sound will still be around, which isn't too bad.
  
## Relavant guide part from Original readme

### Usage WindowsToaster

**Note:** There are some limitations for images in native Windows 8 notifications:
The image must be a PNG image, and cannot be over 1024x1024 px, or over over 200Kb.
You also need to specify the image by using an absolute path. These limitations are
due to the Toast notification system. A good tip is to use something like
`path.join` or `path.delimiter` to have cross-platform pathing.

**Windows 10 Note:** You might have to activate banner notification for the toast to show.

From [mikaelbr/gulp-notify#90 (comment)](https://github.com/mikaelbr/gulp-notify/issues/90#issuecomment-129333034)
> You can make it work by going to System > Notifications & Actions. The 'toast' app needs to have Banners enabled. (You can activate banners by clicking on the 'toast' app and setting the 'Show notification banners' to On)

[Snoretoast](https://github.com/KDE/snoretoast) is used to get native Windows Toasts!

```javascript
const WindowsToaster = require('node-notifier').WindowsToaster;

var notifier = new WindowsToaster({
  withFallback: false, // Fallback to Growl or Balloons?
  customPath: void 0 // Relative/Absolute path if you want to use your fork of SnoreToast.exe
});

notifier.notify({
  title: void 0, // String. Required
  message: void 0, // String. Required if remove is not defined
  icon: void 0, // String. Absolute path to Icon
  sound: false, // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
  wait: false, // Bool. Wait for User Action against Notification or times out
  id: void 0, // Number. ID to use for closing notification.
  appID: void 0, // String. App.ID and app Name. Defaults to empty string.
  remove: void 0, // Number. Refer to previously created notification to close.
  install: void 0 // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
}, function(error, response) {
  console.log(response);
});
```
### Usage WindowsBalloon

For earlier Windows versions, the taskbar balloons are used (unless
fallback is activated and Growl is running). For balloons, a great
project called [notifu](http://www.paralint.com/projects/notifu/) is used.

```javascript
const WindowsBalloon = require('node-notifier').WindowsBalloon;

var notifier = new WindowsBalloon({
  withFallback: false, // Try Windows Toast and Growl first?
  customPath: void 0 // Relative/Absolute path if you want to use your fork of notifu
});

notifier.notify({
  title: void 0,
  message: void 0,
  sound: false, // true | false.
  time: 5000, // How long to show balloon in ms
  wait: false, // Wait for User Action against Notification
  type: 'info' // The notification type : info | warn | error
}, function(error, response) {
  console.log(response);
});
```

See full usage on the [project homepage: notifu](http://www.paralint.com/projects/notifu/).  
## Changes from node-notifier
- Removed examples and test folders
- Removed linux and OSx (mac) OS notifications capability (Since tera does not use it?). Commented out in index.js
- Removed Linux/OSx notification scripts
- Added dependencies to its own folder and edited the coressponding .requires() 
- Removed 'which' dependency since it is for Linux notifier only.
- Reworked index.js, reorganised file structure so that it can work with TERA Proxy without conflicts.
- Added afk detection functionality. Not tested fully.

## Future works
- Debugging (probably has alot of bugs)
- See whether it is possible to detect window state of Tera (Minimise/maximised) and automatically shut off notification based on that. Would also allow notification
