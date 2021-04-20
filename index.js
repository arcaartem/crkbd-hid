var HID = require('node-hid');
var devices = HID.devices();
devices.filter(device => device.product == 'Corne').forEach(device=> console.log(device));
