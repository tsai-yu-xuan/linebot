import axios from 'axios'

export default async (event) => {
  try {
    const { data } = await axios.get('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1')
    console.log(data)
  } catch (error) {

  }
}
