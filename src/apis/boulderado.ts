import { JSDOM } from 'jsdom'
import type { AbsoluteAPIResult, BoulderadoAPI } from '../index.js'
import type { Got } from 'got-scraping'

export default async function getOccupancy(httpClient: Got, apiOptions: BoulderadoAPI): Promise<AbsoluteAPIResult> {
  const response = await httpClient('https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php', {
    searchParams: new URLSearchParams(
      Object.entries({
        mode: 'get',
        token: apiOptions.token,
      })
    ),
    headers: {
      'sec-fetch-dest': 'iframe',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'cross-site',
    },
  })
  if (response.statusCode !== 200)
    throw new Error(`Getting Occupancy from Boulderado failed with status ${response.statusCode}`)

  const { document } = new JSDOM(response.body).window

  const actualHeadcountElement = document.querySelector('.actcounter[data-value]')
  const freeHeadcountElement = document.querySelector('.freecounter[data-value]')

  if (!actualHeadcountElement || !freeHeadcountElement)
    throw new Error("Couldn't find Information in Boulderado's API response")

  // ignore typescript, because the selector gurantees that the attribute exists
  // @ts-ignore
  const current = parseInt(actualHeadcountElement.getAttribute('data-value'))
  // @ts-ignore
  const free = parseInt(freeHeadcountElement.getAttribute('data-value'))

  return {
    type: 'absolute',
    current,
    max: current + free,
  }
}
