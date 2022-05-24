export interface Sub {
  nick: string
  subMonths: number
  avatar: string
  description?: string
}

export interface SubsResponseFromApi {
  created: string
  episode: array
  gender: string
  id: number
  image: string
  location: object
  name: string
  origin: object
  species: string
  status: string
  type: string
  url: string
  results: array
}