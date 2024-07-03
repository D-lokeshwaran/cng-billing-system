/* NOTE: My system is using base-10 based file system so i used
         1000 for file conversion, elsewhere use 1024 file format.
*/
import { MAX_FILE_SIZE } from "src/config";

export const getReadableFileSize = (bytes) => {
    const units = ["Bytes", "KB", "MB", "GB"];
    const k = 1000; // base-10
    if (bytes === 0) return "0 bytes"
    let unitIndex = 0;
    
    while (bytes >= k && unitIndex < units.length -1) {
        bytes /= k;
        unitIndex++;
    }

    return `${bytes?.toFixed(2) || 0} ${units[unitIndex]}`;
}

const splitSizeAndUnit = (readableSize) => {
    const unit = readableSize.replaceAll(/[0-9\.]+/g, "").trim();
    const size = readableSize.replaceAll(/[a-zA-Z]+/g, "").trim();
    return { unit, size };
}
const conversionFactor = 1048576; // 1 MB in bytes

export const validateFileSize = (fileSizeInBytes) => {
    const fileSizeInMB = fileSizeInBytes / conversionFactor;
    const maxSizeSplit = splitSizeAndUnit(MAX_FILE_SIZE);
    return fileSizeInMB.toFixed(2) > Number(maxSizeSplit.size).toFixed(2);
};