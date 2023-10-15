import { IMedatada } from "src/helpers/metadata.helper"

export class Modpack {
    id: string
    name: string
    gameVersion: string
    isDefault: boolean
    metadata: IMedatada
    constructor(params : { id: string, name: string, gameVersion: string, isDefault: boolean, metadata: IMedatada}){
        this.id = params.id
        this.name = params.name
        this.isDefault = params.isDefault
        this.gameVersion = params.gameVersion
        this.metadata = params.metadata
    }
}
