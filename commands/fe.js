import axios from 'axios'
import adopt from '../templates/adopt.js'
import fs from 'node:fs'

export default async (event) => {
  try {
    const { data } = await axios.get('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1')
    const courses = data.filter(courses => courses.animal_kind === event.message.text)

    const limit = 10
    // console.log(courses)

    const animals = courses.slice(0, limit).map(animal => {
      console.log('animal', animal)
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
      // 沒有無片時放固定照片
      if (animal.album_file === '') {
        replyAdopt.hero.url = 'https://github.com/tsai-yu-xuan/linebot-04/blob/main/images/no.jpg?raw=true'
      } else { replyAdopt.hero.url = animal.album_file }
      // 動物年齡
      let age = ''
      if (animal.animal_age === 'CHILD') {
        age = '幼年'
      } else if (animal.animal_age === 'ADULT') {
        age = '成年'
      } else {
        age = '不知道'
      }
      // 動物狀態 開放認養?
      let status = ''
      if (animal.animal_status === 'OPEN') {
        status = '開放認養'
      } else if (animal.animal_status === 'ADOPTED') {
        status = '已認養'
      } else if (animal.animal_status === 'NONE') {
        status = '未公告'
      } else if (animal.animal_status === 'DEAD') {
        status = '已死亡'
      } else {
        status = '其他'
      }

      replyAdopt.body.contents[0].text = `${animal.animal_Variety.trim()} ${animal.animal_colour}`
      replyAdopt.body.contents[1].contents[0].text = `${age.trim()}  ${a}`
      replyAdopt.body.contents[2].contents[0].contents[1].text = status
      replyAdopt.body.contents[2].contents[1].contents[1].text = animal.shelter_name ? animal.shelter_name : '無資料'
      // 處理電話號碼中的分機部分
      let shelterTel = animal.shelter_tel
      if (shelterTel.includes('分機')) {
        shelterTel = shelterTel.replace('分機', '#')
      }
      // 將電話號碼中的所有特殊字符進行URL編碼處理
      shelterTel = encodeURIComponent(shelterTel)

      replyAdopt.footer.contents[0].action.uri = `tel:+886${shelterTel}`
      replyAdopt.footer.contents[1].action.uri = `https://www.google.com.tw/maps/place/${encodeURIComponent(animal.shelter_address)}`
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
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤，請稍後在試')
  }
}
