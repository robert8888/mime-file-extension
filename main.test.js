const mfe = require("./index");

test("Get file extensions", ()=>{
    expect(mfe.getFileExtensions("audio/x-aac")).toEqual(["aac"])
    expect(mfe.getFileExtensions("audio/x-aiff")).toEqual(["aif","aifc","aiff"])
    expect(mfe.getFileExtensions("text/csv")).toEqual(["csv"])
    expect(mfe.getFileExtensions("image/cgm")).toEqual(["cgm"])
    expect(mfe.getFileExtensions("text/html")).toEqual(["html","htm"])
    expect(mfe.getFileExtensions("model/iges")).toEqual(["igs","iges"])
    expect(mfe.getFileExtensions("application/ogg")).toEqual(["ogx"])
    expect(mfe.getFileExtensions("audio/ogg")).toEqual(["oga","ogg","spx"])
    expect(mfe.getFileExtensions("audio/webm")).toEqual(["weba"])
    expect(mfe.getFileExtensions("application/postscript")).toEqual(["ai","eps","ps"])

     expect(()=>mfe.getFileExtensions("")).toThrow(/Function.*expect argument/)
     expect(()=>mfe.getFileExtensions()).toThrow(/Function.*expect argument/)
     expect(()=>mfe.getFileExtensions("audio")).toThrow(/Not\srecognized\smime\stype/)
     expect(()=>mfe.getFileExtensions("web")).toThrow(/Not\srecognized\smime\stype/)
     expect(()=>mfe.getFileExtensions("postscript")).toThrow(/Not\srecognized\smime\stype/)
})

test("Get mime types", ()=>{ 
    expect(mfe.getMimeType("aac")).toBe("audio/x-aac");
    expect(mfe.getMimeType("ogx")).toBe("application/ogg");
    expect(mfe.getMimeType("ai")).toBe("application/postscript");
    expect(mfe.getMimeType("pnm")).toBe("image/x-portable-anymap");
    expect(mfe.getMimeType("pfx")).toBe("application/x-pkcs12");
    expect(mfe.getMimeType("efif")).toBe("application/vnd.picsel");
    expect(mfe.getMimeType("rip")).toBe("audio/vnd.rip");
    expect(mfe.getMimeType("gif")).toBe("image/gif");

    expect(()=>mfe.getMimeType("")).toThrow("Function get Mime Type expect argument 'extension' (file)")
    expect(()=>mfe.getMimeType()).toThrow("Function get Mime Type expect argument 'extension' (file)")

    for( ext of ["adfs", "ggg", "zzz", "zz"]){
        expect(()=>mfe.getMimeType(ext)).toThrow(`Not recognized file extension: '${ext}'`)
    }

})