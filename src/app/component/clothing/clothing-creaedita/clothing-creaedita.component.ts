import { ActivatedRoute, Params, Router } from '@angular/router';
import { Clothing } from './../../../model/clothing';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ClothingService } from 'src/app/service/clothing.service';
import { Texture } from 'src/app/model/texture';
import { Color } from 'src/app/model/color';
import { Catalog } from 'src/app/model/catalog';
import { Store } from 'src/app/model/store';
import { Closet } from 'src/app/model/closet';
import { Brand } from 'src/app/model/brand';
import { Event } from 'src/app/model/event';
import { TypeClothing } from 'src/app/model/typeclothing';
import { TextureService } from 'src/app/service/texture.service';
import { ColorService } from 'src/app/service/color.service';
import { CatalogService } from 'src/app/service/catalog.service';
import { StoreService } from 'src/app/service/store.service';
import { ClosetService } from 'src/app/service/closet.service';
import { BrandService } from 'src/app/service/brand.service';
import { TypeclothingService } from 'src/app/service/typeclothing.service';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-clothing-creadita',
  templateUrl: './clothing-creaedita.component.html',
  styleUrls: ['./clothing-creaedita.component.css']
})
export class ClothingCreaditaComponent {

  form: FormGroup = new FormGroup({});
  Clothing: Clothing = new Clothing();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaTexturas: Texture[]=[];
  listaColores: Color[]=[];
  listaCatalogos: Catalog[]=[];
  listaTiendas: Store[]=[];
  listaArmarios: Closet[]=[];
  listaMarcas: Brand[]=[];
  listaTipos: TypeClothing[]=[];
  listaEventos: Event[]=[];


  constructor(private cC:ClothingService,private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute,
    private tS: TextureService, private cS:ColorService, private catS: CatalogService, private sS: StoreService, private cloS: ClosetService,
    private bS: BrandService, private tcS: TypeclothingService, private eS: EventService){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form=this.formBuilder.group({
      idClothing:['',],
      season:['',Validators.required],
      texture:['',Validators.required],
      color:['',Validators.required],
      event:['',Validators.required],
      catalog:['',Validators.required],
      store:['',Validators.required],
      closet:['',Validators.required],
      brand:['',Validators.required],
      typeClothing:['',Validators.required],
    });
    ;
    this.tS.list().subscribe(data=>{
      this.listaTexturas=data
    });
    this.cS.list().subscribe(data=>{
      this.listaColores=data
    });
    this.catS.list().subscribe(data=>{
      this.listaCatalogos=data
    });
    this.tS.list().subscribe(data=>{
      this.listaTexturas=data
    });
    this.sS.list().subscribe(data=>{
      this.listaTiendas=data
    });
    this.bS.list().subscribe(data=>{
      this.listaMarcas=data
    });
    this.tcS.list().subscribe(data=>{
      this.listaTipos=data
    });
    this.cloS.list().subscribe(data=>{
      this.listaArmarios=data
    });
    this.eS.list().subscribe(data=>{
      this.listaEventos=data
    });
  }
  registrar(){
    if(this.form.valid){
      this.Clothing.idClothing=this.form.value.idClothing;
      this.Clothing.season=this.form.value.season;
      this.Clothing.texture=this.form.value.texture;
      this.Clothing.color=this.form.value.color;
      this.Clothing.event=this.form.value.event;
      this.Clothing.catalog=this.form.value.catalog;
      this.Clothing.store=this.form.value.store;
      this.Clothing.closet=this.form.value.closet;
      this.Clothing.brand=this.form.value.brand;
      this.Clothing.typeclothing=this.form.value.TypeClothing;
      if(this.edicion){
        this.cC.update(this.Clothing).subscribe(()=>{
          this.cC.list().subscribe(data=>{
            this.cC.setList(data);
          })
        })
      }else{
        this.cC.insert(this.Clothing).subscribe((data)=>{
          this.cC.list().subscribe((data)=>{
            this.cC.setList(data);
          });
        });
      }this.router.navigate(['components/clothings'])
    }else{
      this.mensaje="Por favor, revise los campos";
    }
  }

  obtenerControlCampo(nombreCampo:string):AbstractControl{
    const control=this.form.get(nombreCampo);
    if(!control){
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init(){
    if(this.edicion){
      this.cC.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          idClothing:new FormControl(data.idClothing),
          season:new FormControl(data.season),
          texture:new FormControl(data.texture),
          color:new FormControl(data.color),
          event:new FormControl(data.event),
          catalog:new FormControl(data.catalog),
          store:new FormControl(data.store),
          closet:new FormControl(data.closet),
          brand:new FormControl(data.brand),
          TypeClothing:new FormControl(data.typeclothing),
        });
      });
    }
  }
}

