import axios from 'axios'
import adopt from '../templates/adopt.js'
import fs from 'node:fs'

export default async (event) => {
  try {
    const { data } = await axios.get('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1')
    const courses = data.filter(courses => courses.animal_kind === event.message.text)

    const limit = 5
    // console.log(course)

    const animals = courses.slice(0, limit).map(animal => {
      // console.log('animal', animal)
      const replyAdopt = JSON.parse(JSON.stringify(adopt))
      console.log(replyAdopt)
      let a = ''
      if (animal.animal_sex === 'F') {
        a = '性別:母'
      } else if (animal.animal_sex === 'M') {
        a = '性別:公'
      } else {
        a = '性別:不知道'
      }
      replyAdopt.hero.url = animal.album_file
      replyAdopt.body.contents[0].text = `${animal.animal_Variety.trim() + ' ' + animal.animal_colour + ' ' + a}`
      replyAdopt.footer.contents[0].action.uri = ` tel:${animal.shelter_tel}`
      replyAdopt.footer.contents[1].action.uri = ` https://www.google.com/maps/place/${animal.shelter_name}`

      return replyAdopt
    })
    const animalsReply = {
      type: 'flex',
      altText: '寵物認養查詢結果',
      contents: {
        type: 'carousel',
        // 輪播
        contents: animals
      }
    }
    const result = await event.reply(animalsReply)

    if (process.env.DEBUG === 'true') {
      if (result.message) { fs.writeFileSync('./dump/animals.json', JSON.stringify(animals, null, 2)) }
    }

    // 正文教我的
    // const reply = {
    //   type: 'flex',
    //   altText: '寵物認養查詢結果',
    //   contents: {
    //     type: 'carousel',
    //     // 輪播
    //     contents: animals
    //   }
    // }
    // event.reply(reply)
    // const exists = fs.existsSync('./dump')
    // if (!exists) {
    //   fs.mkdirSync('./dump')
    // }
    // fs.writeFileSync('./dump/animals.json', JSON.stringify(reply, null, 2))
    // console.log(JSON.stringify(reply, null, 2))
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤，請稍後在試')
  }
}
