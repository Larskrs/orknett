const contentTypeList = {
    "audio": ["mp3", "wav", "aac", "flac"],
    "video": ["mp4", "avi", "mov", "mkv"],
    "image": [".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg"],
    "application": ["pdf", "doc", "docx", "txt", "json", "xml"],
    "text": ["html", "css"],
    "javascript": ["js"]
    // Add more content-types and associated file extensions as needed
  };
  
  function getFileExtensionsByContentType(contentType) {
    const fileExtensions = [];
  
    for (const [type, extensions] of Object.entries(contentTypeList)) {
      if (contentType.startsWith(type + "/")) {
        fileExtensions.push(...extensions);
      }
    }
  
    return fileExtensions;
  }
  
  // Example usage
  export const audioExtensions = getFileExtensionsByContentType("audio/mp3");
  
  export const imageExtensions = getFileExtensionsByContentType("image/jpeg");
  

export function GetContentType(fileExtension) {
    const contentTypeMap = {
      mp3: "audio/mp3",
      wav: "audio/wav",
      aac: "audio/aac",
      flac: "audio/flac",
      mp4: "video/mp4",
      avi: "video/x-msvideo",
      mov: "video/quicktime",
      mkv: "video/x-matroska",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      txt: "text/plain",
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      json: "application/json",
      xml: "application/xml",
      ico: "image/vnd.microsoft.icon",
      svg: "image/svg+xml",
      // Add more file extensions and content types as needed
    };
  
    const contentTypes = Object.entries(contentTypeMap)
      .sort((a, b) => a[1].localeCompare(b[1]))
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
  
    const contentType = contentTypes[fileExtension.toLowerCase()];
    return contentType || "application/octet-stream"; // Default to binary if no matching content type found

}
