import 'dotenv/config'
// 引用dotenv的套件
import linebot from 'linebot'
// 引用linebot的套件
import fe from './commands/fe.js'

// import adopt from './commands/adopt.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
// 設定套件的env環境變數

// 當我的bot收到訊息時，
bot.on('message', async (event) => {
  if (event.message.text === '狗' || event.message.text === '貓' || event.message.text === '我要領養貓貓' || event.message.text === '我要領養狗狗') {
    console.log('Calling fe function for 狗 or 貓') // 调试信息
    fe(event)
  } else {
    event.reply('請輸入 " 貓 " 或 " 狗 " (一個字就好)')
  }
})
// linebot 偵測指定 port 的指定路徑請求
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
// process.env.PORT 因為之後會推雲端 所以要設
