import { IMedatada } from "src/helpers/metadata.helper"

export class Modpack {
    id: string
    name: string
    gameVersion: string
    isModded: boolean
    metadata: IMedatada

    constructor(params : { id: string, name: string, gameVersion: string, isModded: boolean, metadata: IMedatada}){
        this.id = params.id
        this.name = params.name
        this.gameVersion = params.gameVersion
        this.isModded = params.isModded
        this.metadata = params.metadata
    }
}
