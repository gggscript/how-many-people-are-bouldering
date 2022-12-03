interface Gym {
  name: string
  website: string
  api: GymHeadcountAPI
}

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
