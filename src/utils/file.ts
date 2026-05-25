/**
 * Format file size to appropriate unit (KB, MB, GB, or TB)
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;
  const tb = gb / 1024;

  if (mb < 1) {
    return kb.toFixed(2) + " KB";
  } else if (gb < 1) {
    return mb.toFixed(2) + " MB";
  } else if (tb < 1) {
    return gb.toFixed(2) + " GB";
  } else {
    return tb.toFixed(2) + " TB";
  }
};
