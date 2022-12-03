import fs from 'fs'
import { join } from 'path'

// List of Gyms
interface Gym {
  name: string
  website: string
  api: GymHeadcountAPI
}

// Different APIs
type GymHeadcountAPI = BoulderadoAPI | WebclimberAPI
interface BoulderadoAPI {
  type: 'boulderado'
  token: string
}
interface WebclimberAPI {
  type: 'webclimber'
  id: number
  token: string
}

type APIResult = RelativeResult | AbsoluteResult
interface RelativeResult {
  type: 'relative'
  percentage: number
}
interface AbsoluteResult {
  type: 'absolute'
  current: number
  max: number
}

const gyms: readonly Gym[] = JSON.parse(fs.readFileSync(join(__dirname, '..', 'gyms.json'), 'utf8'))

async function getOccupancy(gym: Gym): Promise<APIResult> {
  // TODO: Implement Boulderado
  // TODO: Implement Webclimber
  throw new Error('Gym Headcount API not implemented')
}

export { gyms, getOccupancy }
