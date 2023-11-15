import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TypeClothing } from 'src/app/model/typeclothing';
import { TypeclothingService } from 'src/app/service/typeclothing.service';

@Component({
  selector: 'app-typeclothing-creaedita',
  templateUrl: './typeclothing-creaedita.component.html',
  styleUrls: ['./typeclothing-creaedita.component.css']
})
export class TypeclothingCreaeditaComponent {
  form:FormGroup=new FormGroup({});
  typeClothing:TypeClothing=new TypeClothing();
  mensaje:string='';
  id:number=0;
  edicion:boolean=false;
  //SIZE
  tallas:{value:string,viewValue:string}[]=[
    {value:'XS',viewValue:'XS'},
    {value:'S',viewValue:'S'},
    {value:'M',viewValue:'M'},
    {value:'L',viewValue:'L'},
    {value:'XL',viewValue:'XL'},
    {value:'XLL',viewValue:'XLL'},
    {value:'36',viewValue:'36'},
    {value:'36.5',viewValue:'36.5'},
    {value:'37',viewValue:'37'},
    {value:'37.5',viewValue:'37.5'},
    {value:'38',viewValue:'38'},
    {value:'39',viewValue:'39'},
    {value:'40',viewValue:'40'},
    {value:'41',viewValue:'41'},
    {value:'41.5',viewValue:'41.5'},
    {value:'42',viewValue:'42'},
    {value:'42.5',viewValue:'42.5'},
    {value:'43',viewValue:'43'},
    {value:'43.5',viewValue:'43.5'},
    {value:'44',viewValue:'44'},
  ];
  //GENDER
  generos:{value:string,viewValue:string}[]=[
    {value:'Masculino',viewValue:'Masculino'},
    {value:'Femenino',viewValue:'Femenino'},
  ];
  //CATEGORY
  categoria:{value:string,viewValue:string}[]=[
    {value:'Camisa',viewValue:'Camisa'},
    {value:'Calzones',viewValue:'Calzones'},
    {value:'Falda',viewValue:'Falda'},
    {value:'Medias',viewValue:'Medias'},
    {value:'Pantalon',viewValue:'Pantalon'},
    {value:'Polo',viewValue:'Polo'},
    {value:'Ropa Interior',viewValue:'Ropa Interior'},
    {value:'Sudadera',viewValue:'Sudadera'},
    {value:'Short',viewValue:'Short'},
    {value:'Tenis',viewValue:'Tenis'},
    {value:'Zapatos',viewValue:'Zapatos'},
    {value:'Zapatillas',viewValue:'Zapatillas'},
  ];
  constructor(private tcS:TypeclothingService,private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute){ }

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form=this.formBuilder.group({
      idTypeClothing:['',],
      nameTypeClothing:['',Validators.required],
      size:['',Validators.required],
      gender:['',Validators.required],
      description:['',Validators.required],
      category:['',Validators.required],
      occasion:['',Validators.required],
    });
  }

  registrar(){
    if(this.form.valid){
      this.typeClothing.idTypeClothing=this.form.value.idTypeClothing;
      this.typeClothing.nameTypeClothing=this.form.value.nameTypeClothing;
      this.typeClothing.size=this.form.value.size;
      this.typeClothing.gender=this.form.value.gender;
      this.typeClothing.description=this.form.value.description;
      this.typeClothing.category=this.form.value.category;
      this.typeClothing.occasion=this.form.value.occasion;
      if(this.edicion){
        this.tcS.update(this.typeClothing).subscribe(()=>{
          this.tcS.list().subscribe(data=>{
            this.tcS.setList(data);
          })
        })
      }else{
        this.tcS.insert(this.typeClothing).subscribe((data)=>{
          this.tcS.list().subscribe((data)=>{
            this.tcS.setList(data);
          });
        });
      }this.router.navigate(['components/typeClothings'])
    }else{
      this.mensaje="Por favor, revise los campos"
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
      this.tcS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          idTypeClothing:new FormControl(data.idTypeClothing),
          nameTypeClothing:new FormControl(data.nameTypeClothing),
          size:new FormControl(data.size),
          gender:new FormControl(data.gender),
          description:new FormControl(data.description),
          category:new FormControl(data.category),
          occasion:new FormControl(data.occasion),
        });
      });
    }
  }
}
