const HID = require('node-hid');
const VENDOR_ID = 0x4653;
const PRODUCT_ID = 0x0001;
const USAGE_PAGE = 0xFF60;
const USAGE = 0x61;

class CorneKeyboard {
    constructor() {
        var devices = HID.devices();
        this.deviceInfo = devices.find(d => {
            var isCorne = d.vendorId === VENDOR_ID && d.productId === PRODUCT_ID;
            return isCorne && d.usagePage === USAGE_PAGE && d.usage === USAGE;
        });
    }

    open() {
        this.device = new HID.HID(this.deviceInfo.path);
        this.device.on("data", data => console.log("HID Data received:", data));
        this.device.on("error", err => console.error("HID error: ", err));
    }

    close() {
        this.device.close();
    }

    sendText(line, text) {
        var buffer = Buffer.from(text, 'utf8');

        if (line < 0 || line > 1) {
            throw new Error("'line' should be in (0, 1).")
        }
        if (buffer.length > 29) {
            throw new Error("'text' is too long. Must be 29 or fewer characters.");
        }

        // We need to send 33 bytes for some reason 
        // otherwise the subsequent packets won't be sent.
        // default packet length is 32
        var data = Array(33).fill(0);
        data[1] = line;
        data[2] = buffer.length;
        for (var i=0; i<buffer.length; i++) {
            data[i+3] = buffer[i]
        }

        var count = this.device.write(data);
    }
}

var keyboard = new CorneKeyboard();
keyboard.open();
try {
    keyboard.sendText(0, "Hello, world!");
    keyboard.sendText(1, "This is a test!");
} finally {
    keyboard.close();
}

