import fs from 'fs'
import { join } from 'path'
import { gotScraping } from 'got-scraping'
import type { Got, ExtendOptions } from 'got-scraping'
import getBoulderadoOccupancy from './apis/boulderado'
import getWebclimberOccupancy from './apis/webclimber'

export interface Gym {
  name: string
  website: string
  api: GymHeadcountAPI
}

// Different APIs
export type GymHeadcountAPI = BoulderadoAPI | WebclimberAPI
export interface BoulderadoAPI {
  type: 'boulderado'
  token: string
}
export interface WebclimberAPI {
  type: 'webclimber'
  id: number
  token: string
  area?: number
}

// Different Ways APIs respond
export type APIResult = RelativeAPIResult | AbsoluteAPIResult
export interface RelativeAPIResult {
  type: 'relative'
  percentage: number
}
/** WARNING: {@link max} may be smaller than {@link current}, because of an outdated configuration by the gym */
export interface AbsoluteAPIResult {
  type: 'absolute'
  current: number
  max: number
}

let httpClient = gotScraping

/** List of Bouldering Gyms */
const gyms: readonly Gym[] = JSON.parse(fs.readFileSync(join(__dirname, '..', 'gyms.json'), 'utf8'))

/** Request Occupancy Information from a HTTP API */
async function getOccupancy(gym: Gym): Promise<APIResult> {
  if (gym.api.type === 'boulderado') {
    return await getBoulderadoOccupancy(httpClient, gym.api)
  } else if (gym.api.type === 'webclimber') {
    return await getWebclimberOccupancy(httpClient, gym.api)
  }
  throw new Error('Gym Headcount API not implemented')
}

/**
 * This project's HTTPClient is {@link https://github.com/apify/got-scraping| got-scraping by apify} an extension of {@link https://github.com/sindresorhus/got| got by sindresorhus}
 * Check got.extend at {@link https://github.com/sindresorhus/got/blob/main/documentation/10-instances.md#gotextendoptions-instances| got documentation} on how to use this */
function setHttpOptions(...instancesOrOptions: (Got | ExtendOptions)[]) {
  httpClient = httpClient.extend(...instancesOrOptions)
}

export { gyms, getOccupancy, setHttpOptions }
