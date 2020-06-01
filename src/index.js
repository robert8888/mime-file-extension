const typeMap = require("./map.json");

const getFileExtensions = (mimeType, full) => {
    if(!mimeType){
        throw new Error("Function get File Extension expect argument 'mimeTypes'")
    }

    if(!typeMap[mimeType]){
        throw new Error(`Not recognized mime type. :'${mimeType}'`);
    }

    let extensions = typeMap[mimeType].extensions;

    if(full){
        extensions = extensions.map( extension => "." + extension);
    }

    return extensions;
}

const getMimeType = extension =>{
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

module.exports = {
    getFileExtensions,
    getMimeType
}