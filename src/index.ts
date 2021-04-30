import typeMap from "./map.json";
type schemaTypeMap = typeof import("./map.json");

/**
 * 
 * @param {String}mimeType - required string mimetype
 * @param {Boolean}full - return format with dots on front
 * @returns {String[]} - file extensions
 */
const getFileExtensions = (mimeType: string, full = false): string[] => {
    if(!mimeType){
        throw new Error("Function getFileExtension expect argument 'mimeTypes'")
    }

    if(!typeMap[mimeType as keyof schemaTypeMap]){
        throw new Error(`Not recognized mime type. :'${mimeType}'`);
    }

    let extensions = typeMap[mimeType as keyof schemaTypeMap].extensions;

    if(full){
        extensions = extensions.map((extension: string) => "." + extension);
    }

    return extensions;
}

const getMimeType = (extension: string): string =>{
    if(!extension){
        throw new Error("Function get Mime Type expect argument 'extension' (file)")
    }

    if(extension.startsWith(".")){
        extension = extension.substr(1, extension.length)
    }

    const type = Object.values(typeMap)
        .find( type => type.extensions.includes(extension));

    if(!type){
        throw new Error(`Not recognized file extension: '${extension}'`)
    }

    return type.mime;
}

export {
    getFileExtensions,
    getMimeType
}