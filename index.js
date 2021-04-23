import CorneKeyboard from './corne-keyboard.js';
import si from 'systeminformation';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const { currentLoad } = await si.currentLoad();
const { active, total } = await si.mem();
const { main } = await si.cpuTemperature();
const defaultInterface = await si.networkInterfaceDefault();

await si.networkStats(defaultInterface);
await sleep(500);
const networks = await si.networkStats(defaultInterface);

const { rx_sec, tx_sec } = networks[0];

var keyboard = new CorneKeyboard();
keyboard.open();
try {
    keyboard.sendText(0, `C:${currentLoad.toFixed(1)}%  M:${(active/total*100).toFixed(1)}%`);
    keyboard.sendText(1, `T:${main}C  N:\x18${(rx_sec/1024).toFixed(0)}k/\x19${(tx_sec/1024).toFixed(0)}k`);
} finally {
    keyboard.close();
}
