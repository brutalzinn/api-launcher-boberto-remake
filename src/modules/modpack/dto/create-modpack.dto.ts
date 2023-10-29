export class CreateModpackDto {
    name: string
    gameVersion: string
    manifestUrl?: string
    thumb?: string
    icon?: string
    verify: boolean
    isDefault: boolean
    loader?: CreateModpackModdedDto
}

export class CreateModpackModdedDto {
    type?: string
    build?: string
    enable: boolean
}
