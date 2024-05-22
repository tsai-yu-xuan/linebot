import 'dotenv/config'
// 引用dotenv的套件
import linebot from 'linebot'
// 引用linebot的套件
import commandFE from './commands/fe.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
// 設定套件的env環境變數

// 當我的bot收到訊息時，
bot.on('message', event => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }
  if (event.message.type === 'text') {
    if (event.message.text === '桃園') {
      commandFE(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
// process.env.PORT 因為之後會推雲端 所以要設
