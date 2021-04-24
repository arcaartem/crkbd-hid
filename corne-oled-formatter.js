const UP_ARROW = `\x18`;
const DOWN_ARROW = `\x19`;

class CorneOledFormatter {
    formatSystemInformation(systemInformation) {
        const { load, memoryUtilisation, temperature, receivedBytesPerSec, sentBytesPerSec } = systemInformation;
        const oledLines = [];
        oledLines.push(`C:${load.toFixed(1)}%  M:${memoryUtilisation.toFixed(1)}%`);
        oledLines.push(`T:${temperature}C  N:${UP_ARROW}${(receivedBytesPerSec/1024).toFixed(0)}k/${DOWN_ARROW}${(sentBytesPerSec/1024).toFixed(0)}k`);
        return oledLines
    }
}

export default CorneOledFormatter;
