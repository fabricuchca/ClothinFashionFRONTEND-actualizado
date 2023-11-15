import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Brand } from 'src/app/model/brand';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-brand-creaedita',
  templateUrl: './brand-creaedita.component.html',
  styleUrls: ['./brand-creaedita.component.css']
})
export class BrandCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  brand: Brand = new Brand();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  paises:{value:string;viewValue:string}[]=[
    {value:'Alemania',viewValue:'Alemania'},
    {value:'Bangladesh',viewValue:'Bangladesh'},
    {value:'Brasil',viewValue:'Brasil'},
    {value:'China',viewValue:'China'},
    {value:'Estados Unidos',viewValue:'Estados Unidos'},
    {value:'España',viewValue:'España'},
    {value:'Francia',viewValue:'Francia'},
    {value:'India',viewValue:'India'},
    {value:'Italia',viewValue:'Italia'},
    {value:'Paises Bajos',viewValue:'Paises Bajos'},
    {value:'Peru',viewValue:'Peru'},
    {value:'Reino Unido',viewValue:'Reino Unido'},
    {value:'Vietnam',viewValue:'Vietnam'},
  ];
  constructor(private bS:BrandService,private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form=this.formBuilder.group({
      idBrand:['',],
      nameBrand:['',Validators.required],
      country:['',Validators.required],
      webSite:['',Validators.required],
      description:['',Validators.required],
      tags:['',Validators.required],
    });
  }
  registrar(){
    if(this.form.valid){
      this.brand.idBrand=this.form.value.idBrand;
      this.brand.nameBrand=this.form.value.nameBrand;
      this.brand.country=this.form.value.country;
      this.brand.webSite=this.form.value.webSite;
      this.brand.description=this.form.value.description;
      this.brand.tags=this.form.value.tags;
      if(this.edicion){
        this.bS.update(this.brand).subscribe(()=>{
          this.bS.list().subscribe(data=>{
            this.bS.setList(data);
          })
        })
      }else{
        this.bS.insert(this.brand).subscribe((data)=>{
          this.bS.list().subscribe((data)=>{
            this.bS.setList(data);
          });
        });
      }this.router.navigate(['components/brands'])
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
      this.bS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          idBrand:new FormControl(data.idBrand),
          nameBrand:new FormControl(data.nameBrand),
          country:new FormControl(data.country),
          webSite:new FormControl(data.webSite),
          description:new FormControl(data.description),
          tags:new FormControl(data.tags),
        });
      });
    }
  }
}
