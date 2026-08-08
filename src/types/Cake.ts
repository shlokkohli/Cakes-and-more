export interface Cake {
  price: string
  shortDescription: string
  title: string
  images: string
  types: string[]
}

export interface CakeResponse {
  data: Cake[]
  page: number
  totalPages: number
}
