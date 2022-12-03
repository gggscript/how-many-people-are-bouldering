import fs from 'fs'
import { join } from 'path'
import { gotScraping } from 'got-scraping'
import type { Got, ExtendOptions } from 'got-scraping'
import getBoulderadoOccupancy from './apis/boulderado'

// List of Gyms
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
}

export type APIResult = RelativeAPIResult | AbsoluteAPIResult
export interface RelativeAPIResult {
  type: 'relative'
  percentage: number
}
export interface AbsoluteAPIResult {
  type: 'absolute'
  current: number
  max: number
}

let httpClient = gotScraping

const gyms: readonly Gym[] = JSON.parse(fs.readFileSync(join(__dirname, '..', 'gyms.json'), 'utf8'))

async function getOccupancy(gym: Gym): Promise<APIResult> {
  // TODO: Implement Boulderado
  if (gym.api.type === 'boulderado') {
    return await getBoulderadoOccupancy(httpClient, gym.api)
  }
  // TODO: Implement Webclimber
  throw new Error('Gym Headcount API not implemented')
}

/**
 * This project's HTTPClient is {@link https://github.com/apify/got-scraping| got-scraping by apify} an extension of {@link https://github.com/sindresorhus/got| got by sindresorhus}
 * Check got.extend at {@link https://github.com/sindresorhus/got/blob/main/documentation/10-instances.md#gotextendoptions-instances| got documentation} on how to use this */
function setHttpOptions(...instancesOrOptions: (Got | ExtendOptions)[]) {
  httpClient = httpClient.extend(...instancesOrOptions)
}

export { gyms, getOccupancy, setHttpOptions }
