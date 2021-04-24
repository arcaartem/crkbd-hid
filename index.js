import CorneKeyboard from './corne-keyboard.js';
import SystemInformation from './system-information.js';

var systemInformation = new SystemInformation();
var stats = await systemInformation.getStats();
var { load, memoryUtilisation, temperature, receivedBytesPerSec, sentBytesPerSec } = stats;

var keyboard = new CorneKeyboard();
keyboard.open();
try {
    keyboard.sendText(0, `C:${load.toFixed(1)}%  M:${memoryUtilisation.toFixed(1)}%`);
    keyboard.sendText(1, `T:${temperature}C  N:\x18${(receivedBytesPerSec/1024).toFixed(0)}k/\x19${(sentBytesPerSec/1024).toFixed(0)}k`);
} finally {
    keyboard.close();
}
