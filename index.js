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

function errorHandler(err) {
    console.error('Error');
    console.error(err);
    keyboard.close();
    process.exit();
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGQUIT', exitHandler);
process.on('uncaughtException', errorHandler);

console.log('Opening keyboard');
keyboard.open();

const systemInformation = new SystemInformation();

const oledFormatter = new CorneOledFormatter();

setInterval(async () => {
    console.log('Getting stats');
    const stats = await systemInformation.getStats();
    console.log('Formatting stats');
    const oledLines = oledFormatter.formatSystemInformation(stats);
    console.log('Sending stats');
    keyboard.sendText(0, oledLines[0]);
    keyboard.sendText(1, oledLines[1]);
    console.log('Done');
}, POLL_INTERVAL);

