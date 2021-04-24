import SystemInformation from './system-information.js';
import CorneKeyboard from './corne-keyboard.js';
import CorneOledFormatter from './corne-oled-formatter.js';

const systemInformation = new SystemInformation();
const stats = await systemInformation.getStats();

const oledFormatter = new CorneOledFormatter();
const oledLines = oledFormatter.formatSystemInformation(stats);

const keyboard = new CorneKeyboard();
keyboard.open();
try {
    keyboard.sendText(0, oledLines[0]);
    keyboard.sendText(1, oledLines[1]);
} finally {
    keyboard.close();
}
