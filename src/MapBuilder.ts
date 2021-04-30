import fs from "fs";

type MimeData =  [name: string, mime: string, ext: string][]
type ExtensionData = Record<string, string>;

type MapEntry = {
    mime: string,
    extensions: string[],
    description: string
}

interface MapSchema {
    [key: string]: MapEntry;
}

export default class MapBuilder{
    private _mimeData: MimeData | undefined;
    private _extensionData: ExtensionData | undefined;

    set mimeData(value: string[][]){
        this._mimeData = value as MimeData;
    }

    set extensionData(value: ExtensionData){
        this._extensionData = value;
    }

    private buildFromMimeData(): MapSchema{
        if(!this._mimeData)
            throw new Error("Mime data not set");

        const map = {} as MapSchema;
        for(const [desc, mime, ext ] of this._mimeData){
            map[mime] = {
                mime,
                extensions: [ext.substr(1, ext.length)],
                description: desc
            }
        }

        return map;
    }

    private buildFromExtensionMap(): MapSchema{
        if(!this._extensionData)
            throw new Error("No extension map data set");

        const map = {} as MapSchema;
        for (const [extension, mime] of Object.entries(this._extensionData)) {
            const ext = extension.substr(1, extension.length)
            if (map[mime]) {
                const exts = new Set(map[mime].extensions)
                exts.add(ext)
                map[mime].extensions = [...exts];
            } else {
                map[mime] = {
                    mime: mime,
                    extensions: [ext],
                    description: ''
                } as MapEntry
            }
        }
        return map;
    }

    private merge(map1: MapSchema, map2: MapSchema): MapSchema{
        const clone = Object.assign({}, map1);
        for(const [mimeType, mapEntry] of Object.entries(map2)){
            if(map1[mimeType]){
                clone[mimeType].extensions = [... new Set([...clone[mimeType].extensions, ...mapEntry.extensions])]
            } else {
                clone[mimeType] = mapEntry
            }
        }
        return clone;
    }

    build(): MapSchema{
        const mapFromMime = this.buildFromMimeData();
        const mapFromExtension = this.buildFromExtensionMap();
        const map = this.merge(mapFromMime, mapFromExtension);
        return map;
    }

    buildAndSaveToFile(filename: string): void{
        if(!filename)
            throw new Error("Method buildAndSaveToFile expect filename as first parameter")
        if(!filename.endsWith(".json"))
            throw new Error("Method buildAndSaveToFile expect to filename ends with .json extension")

        const map = this.build();
    
        //delete if exist
        if(fs.existsSync(filename))
            fs.unlinkSync(filename);

        const stream = fs.createWriteStream(filename);
        
        stream.once("open", ()=>{
            const text = JSON.stringify(map, null, "\t");
            stream.write(text);
            stream.end();
        })
                
    }
}

