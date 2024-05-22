import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'

// console.log(process.env)
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
bot.on('message', async (event) => {
  console.log(event)
  if (event.message.type !== 'text') return
  try {
    // const result = await event.reply(event.message.text)
    // console.log(result)
    const { data } = await axios.get('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1')
  } catch (error) {
    console.log(error)
    console.log(error.name)
    console.log(error.message)
  }

  // 這是把使用著輸入的文字  在一樣的回傳回去
})
bot.listen('/', 3000, () => {
  console.log('機器人啟動')
})
