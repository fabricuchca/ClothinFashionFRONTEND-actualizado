import { Event } from './event';
import { Catalog } from "./catalog"
import { Color } from "./color"
import { Texture } from "./texture"
import { Store } from './store';
import { Closet } from './closet';
import { Brand } from './brand';
import { TypeClothing } from './typeclothing';
import { Season } from './season';

export class Clothing{
  idClothing:number=0
  season:Season=new Season()
  texture:Texture=new Texture()
  color:Color=new Color()
  event:Event=new Event()
  catalog:Catalog=new Catalog()
  store:Store=new Store()
  closet:Closet=new Closet()
  brand:Brand=new Brand()
  typeclothing:TypeClothing=new TypeClothing()
}
