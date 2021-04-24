import SystemInformation from './system-information.js';
import CorneKeyboard from './corne-keyboard.js';
import CorneOledFormatter from './corne-oled-formatter.js';

const POLL_INTERVAL = 1000;

const keyboard = new CorneKeyboard();
function exitHandler() {
    console.log('Closing keyboard');
    keyboard.close();
    process.exit();
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGQUIT', exitHandler);
process.on('uncaughtException', exitHandler);

console.log('Opening keyboard');
keyboard.open();

const systemInformation = new SystemInformation();

const oledFormatter = new CorneOledFormatter();

setInterval(async () => {
    const stats = await systemInformation.getStats();
    const oledLines = oledFormatter.formatSystemInformation(stats);
    keyboard.sendText(0, oledLines[0]);
    keyboard.sendText(1, oledLines[1]);
}, POLL_INTERVAL);

