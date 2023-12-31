import { IMedatada } from "src/helpers/metadata.helper"

export class Modpack {
    id: number
    externalId: string
    name: string
    gameVersion: string
    metadata: IMedatada
    constructor(params : { id: number,  externalId: string,name: string, gameVersion: string, metadata: IMedatada}){
        this.id = params.id
        this.externalId = params.externalId
        this.name = params.name
        this.gameVersion = params.gameVersion
        this.metadata = params.metadata
    }
}
