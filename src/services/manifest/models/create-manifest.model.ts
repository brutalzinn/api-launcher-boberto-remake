import { MinecraftEnvironment } from "./manifest.model"

export class CreateManifestModel{
    inputDirectory: string
    outputDirectory: string
    environment: MinecraftEnvironment
    hostUrl: string
}