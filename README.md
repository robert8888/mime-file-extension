# mime-file-extension
This library solving problem of file extension for concrete mime types and vice versa.

## Install

`npm install mime-file-extension`

## Methods

- getFileExtensions(mimeType, full) 
	> mimeType - String representing mime type eg: "audio/ogg"
	> full - Boolean  - if true return value contains dot at the beginning[".jpeg",  ".jpg",  ".jpe"]
- getMimeType(extension)
	> extension - String representing file extension with or without dot at the beginning


## Usage

```javascript
const mfe = require("mime-file-extension");

console.log(mfe.getFileExtensions("text/csv")) // ["csv"]
console.log(mfe.getFileExtensions("audio/ogg")) // ["oga","ogg","spx"]
console.log(mfe.getFileExtensions("image/jpeg", true)) // [".jpeg", ".jpe", ".jpg"]

console.log(mfe.getMimeType("gif")) // "image/gif"
console.log(mfe.getMimeType("m2a")) // "audio/mpeg"
console.log(mfe.getMimeType("m3a")) // "audio/mpeg"
console.log(mfe.getMimeType(".mp3")) // "audio/mpeg"