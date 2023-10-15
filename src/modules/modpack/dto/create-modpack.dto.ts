export class CreateModpackDto {
    name: string
    gameVersion: string
    manifestUrl?: string
    verify: boolean
    loader?: CreateModpackModdedDto
}

export class CreateModpackModdedDto {
    type?: string
    build?: string
    enable: boolean
}
