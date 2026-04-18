export type CartType = {
  items: {
    product: {
      id: string,
      name: string,
      price: number,
      image: string,
      discount:number,
      size: string,
      url: string,
    },
    quantity: number;
  }[]
}
