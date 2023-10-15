export enum MinecraftEnvironment {
SERVER = "SERVER",
CLIENT = "CLIENT"
}

export enum MinecraftFileType {
"mods",
"data",
"saves",
"config",
"natives",
"shaderpacks",
"other"
}
  
export interface ManifestEntry {
name: string;
path: string;
size: number;
checksum: number;
url: string;
environment: MinecraftEnvironment;
type: MinecraftFileType;
}
