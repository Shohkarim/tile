export type ProductType = {
  id: string,
  name: string,
  price: number,
  image: string,
  desc: string,
  code: number,
  kind: string,
  surface: string,
  size: string,
  form: string,
  color: string,
  country: string,
  maker: string,
  property: string,
  pic_face: string,
  inbox: string,
  weight: string,
  use: string,
  discount: number,
  material: string,
  in_hand?: boolean,


  url: string,
  type: {
    id: string,
    name: string,
    url: string
  },
  countInCart?: number,
  isInFavorite?: boolean
}
