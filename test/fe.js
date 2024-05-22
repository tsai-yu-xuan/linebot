import axios from 'axios'

const main = async () => {
  try {
    const { data } = await axios.get('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1')
    console.log(data)
  } catch (error) {

  }
}
main()
