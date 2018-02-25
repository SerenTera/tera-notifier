const Notifier = require('tera-notifier')

module.exports = function notifTest(dispatch) {
	const notifier = Notifier(dispatch)
	
	notifier.notify({
		title: 'Tera Notification',
		message: 'Test Message \r\n Test 2',
		wait:false, 
		sound:'Notification.IM', 
	})
	
}