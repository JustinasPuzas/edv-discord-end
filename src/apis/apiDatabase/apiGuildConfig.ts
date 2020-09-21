export interface guildConfig {
    guildId: string,
    guildShard: string
    prefix: string,
    silverCoins: number,
    goldCoins: number,
    silverLog: {
        amount: number,
        from: string,
        date: number,
        note: string,
    }[],
    goldLog:{
        amount: number,
        from: string,
        date: number,
        note: string,
    }[],
    voiceModuleOn:boolean,
    voiceModule: apiVoiceChannel[]
    panelModuleOn:boolean,
    panelModule:any[],
}

export interface apiVoiceModule {
    categoryId: string,
    categoryType: 'HIDE' | 'SHOW' | 'PREMIUM'
    access: 'VERIFIED' | 'PUBLIC'
    verifiedRoleId: string | null,
    maxChannels: number,
    activeChannels: apiVoiceChannel[]
}

export interface apiVoiceChannel {
    channelId: string,
    access: 'VERIFIED' | 'PUBLIC'
}