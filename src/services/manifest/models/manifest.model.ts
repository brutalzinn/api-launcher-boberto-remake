export enum MinecraftEnvironment {
SERVER = "SERVER",
CLIENT = "CLIENT"
}

export enum MinecraftFileType {
    MOD = "MOD",
    LIBRARY = "LIBRARY",
    VERSIONCUSTOM = "VERSIONCUSTOM",
    FILE = "FILE"
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
