import { GetContentTypeFromSource } from "./ExtensionHelper";

export function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
      fileSizeInBytes /= 1024;
      i++;
    } while (fileSizeInBytes > 1024);
  
    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  }

  export function getContentIconSource (src) {
    const content = GetContentTypeFromSource(src).split('/')[0]
    console.log(content)
    if (content === "video") return "/video.svg"
    if (content === "audio") return "/audio.svg"
  }