const DEBUG = false;

let UP_ARROW = '\x18';
let DOWN_ARROW = '\x19';

if (DEBUG) {
    UP_ARROW = 'U';
    DOWN_ARROW = 'D';
}

const BYTE_SCALE_CHART = [ '', 'K', 'M', 'G', 'T', 'P' ];

function scaleBytesPerSec(bytesPerSec) {
    let scale = Math.floor(Math.log10(bytesPerSec + 1)/3);
    let divisor = Math.pow(10, (scale) * 3);
    return `${(bytesPerSec/divisor).toFixed(0)}${BYTE_SCALE_CHART[scale]}`;
}

class CorneOledFormatter {
    formatSystemInformation(systemInformation) {
        const { load, memoryUtilisation, temperature, receivedBytesPerSec, sentBytesPerSec } = systemInformation;

        const cpuText = load.toFixed(0).toString().padStart(4);
        const memoryText = memoryUtilisation.toFixed(0).toString().padStart(4);
        const temperatureText = temperature.toFixed(0).toString().padStart(4);
        const receivedBytesText = `${scaleBytesPerSec(receivedBytesPerSec)}`.padStart(4);
        const sentBytesText = `${scaleBytesPerSec(sentBytesPerSec)}`.padStart(4);

        const oledLines = [];
        oledLines.push(`C:${cpuText}% M:${memoryText}%`);
        oledLines.push(`T:${temperatureText}C N:${receivedBytesText}${DOWN_ARROW}/${sentBytesText}${UP_ARROW}`);
        if (DEBUG) {
            console.log(oledLines, oledLines.map(l => l.length));
        }
        return oledLines
    }
}

export default CorneOledFormatter;
