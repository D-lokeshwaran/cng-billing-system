export const getReadableFileSize = (bytes) => {
    const units = ["Bytes", "KB", "MB", "GB"];
    const k = 1000; // using only base-10 later change it.
    if (bytes === 0) return "0 bytes"
    let unitIndex = 0;
    
    while (bytes >= k && unitIndex < units.length -1) {
        bytes /= k;
        unitIndex++;
    }

    return `${bytes.toFixed(2)} ${units[unitIndex]}`;
}