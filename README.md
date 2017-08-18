# tera-notifier
A watered down version of node-notifier that is only for Windows. Work in progress

-READ THIS: When you Clone and download this module, RENAME the resulting folder to tera-notifier, DO NOT leave as 'tera-notifier-master'

Uses these modules and FULL credits goes to them. I DID NOT make this module, merely edited it a little:
- Node-notifier - https://github.com/mikaelbr/node-notifier 
- node-notifier Dependencies(pre-included in this version already)
- snoretoast
- notifu
- Full list can be derived from original docs file

## Quick start example:

```
const notifier = require('tera-notifier'),
       path=require('path')

notifier.notify({
		'title': 'Tera notify',
		'message': 'Party message:VHHM>H/D Leader:sasasa(4/5)',
		'icon': path.join(__dirname,'tera.png'), //Absolute path name. IN this example, tera.png would be placed in base mod folder
		'wait':false, //False= do not wait for response, time out on its own
		'sound':'Notification.IM', 
		'id':1,
	});
  ```
  
Output:

![Output](http://i.imgur.com/HOHMfgf.jpg)  
  Full documentations available at original docs/readme.md in this module
  
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
- Added dependencies to its own folder and edited the coressponding .requires() 
- Removed 'which' dependency since it is for Linux notifier only.
