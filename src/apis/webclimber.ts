import type { RelativeAPIResult, WebclimberAPI } from '../index.js'
import type { Got } from 'got-scraping'

const Regex = /width:\s*([0-9]+)%/

export default async function getOccupancy(httpClient: Got, apiOptions: WebclimberAPI): Promise<RelativeAPIResult> {
  const searchParams: { [key: string]: string } = {
    callback: 'WebclimberTrafficlight.insertTrafficlight',
    key: apiOptions.token,
  }
  if (typeof apiOptions.area === 'number') searchParams.area = apiOptions.area.toString()
  const response = await httpClient(`https://${apiOptions.id}.webclimber.de/de/trafficlight`, {
    searchParams: new URLSearchParams(Object.entries(searchParams)),
    headers: {
      'sec-fetch-dest': 'script',
      'sec-fetch-mode': 'no-cors',
      'sec-fetch-site': 'cross-site',
    },
  })
  if (response.statusCode !== 200)
    throw new Error(`Getting Occupancy from WebclimberAPI failed with status ${response.statusCode}`)

  const match = response.body.match(Regex)
  if (!match) throw new Error("Couldn't find Information in Webclimber's API response")

  return {
    type: 'relative',
    percentage: parseInt(match[1]),
  }
}
