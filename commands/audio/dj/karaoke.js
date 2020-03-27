class Command {
  constructor (client) {
    this.client = client
    this.name = 'karaoke'
    this.aliases = ['노래방', 'ㅏㅁㄱ매ㅏㄷ', 'kara']
    this.category = 'MUSIC_DJ'
    this.requirements = {
      audioNodes: true,
      playingStatus: true,
      voiceStatus: {
        listenStatus: true,
        sameChannel: true,
        voiceIn: true
      }
    }
    this.hide = false
    this.permissions = ['DJ', 'Administrator']
  }

  /**
       * @param {Object} compressed - Compressed Object
       */
  async run (compressed) {
    const locale = compressed.guildData.locale
    const picker = this.client.utils.localePicker
    const { message, args } = compressed
    const filterVal = this.client.audio.filters.getFilterValue(message.guild.id, 'karaoke')
    if (args.length === 0) return message.channel.send(picker.get(locale, 'COMMANDS_AUDIO_KARAOKE_BASE', { VAL: filterVal ? filterVal.level : picker.get(locale, 'UNSET'), DESC: '' }))
    else {
      if (Number(args[0]) < 0) return message.channel.send(picker.get(locale, 'LOWERTHANX', { NUM: '0' }))
      if (Number(args[0]) > 10) return message.channel.send(picker.get(locale, 'HIGHERTHANX', { NUM: '10' }))
      return message.channel.send(picker.get(locale, 'COMMANDS_AUDIO_KARAOKE_BASE', { VAL: this.client.audio.filters.setKaraoke(message.guild.id, Number(args[0])).level, DESC: picker.get(locale, 'COMMANDS_AUDIO_KARAOKE_UNSTABLE') }))
    }
  }
}

module.exports = Command
