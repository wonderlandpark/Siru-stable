class Event {
  constructor (client) {
    this.client = client
    this.name = 'shardReady'
    this.listener = (...args) => this.run(...args)
  }

  /**
   * Run Event
   */
  run () {
    this.client.logger.info(`[BOT] Bot Is Ready. (${this.client.user.tag})`)
    if (this.client.shard.ids[0] === 0) this.client.setActivity()
    this.client.initialized = true
  }
}
module.exports = Event
