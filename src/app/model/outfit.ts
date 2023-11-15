import { Catalog } from "./catalog"

export class Outfit{
  idOutfit: number = 0
  nameOutfit: string = ""
  styleOutfit: string = ""
  clothesNumber: number = 0
  creationDate: Date = new Date(Date.now())
  catalog: Catalog = new Catalog()
}
