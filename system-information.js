import si from 'systeminformation';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class SystemInformation {
    async getStats() {
        const { currentLoad } = await si.currentLoad();
        const { active, total } = await si.mem();
        const { main } = await si.cpuTemperature();
        const defaultInterface = await si.networkInterfaceDefault();

        const networks = await si.networkStats(defaultInterface);

        const { rx_sec, tx_sec } = networks[0];
        return {
            load: currentLoad,
            memoryUtilisation: active/total*100,
            temperature: main,
            receivedBytesPerSec: rx_sec,
            sentBytesPerSec: tx_sec
        };
    }
}

export default SystemInformation
