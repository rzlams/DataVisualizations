import { csv } from 'd3'

// const csvUrl = 'https://gist.githubusercontent.com/skill-devs/5ab544e7b0b181e5ca3634bccc60a834/raw/cssColor.csv'
// const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/UN_Population_2019.csv'
const csvUrl = 'https://gist.githubusercontent.com/curran/6cd1e224d76811b68df4/raw/populationByCountry2015.csv'

// const fetchText = async (url) => {
//   const response = await fetch(url)
//   const data = await response.text()
//   return csvParse(data)
// }

export const getData = async () => {
  const data = await csv(csvUrl)

  console.log(data)

  return data
}
