import mimeData from "./source/mimeData";
import extensionData from "./source/extensionData";
import MapBuilder from "./MapBuilder";

const builder = new MapBuilder();
builder.mimeData = mimeData;
builder.extensionData = extensionData
builder.buildAndSaveToFile('src/map.json')