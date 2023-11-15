import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Color } from 'src/app/model/color';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-color-creaedita',
  templateUrl: './color-creaedita.component.html',
  styleUrls: ['./color-creaedita.component.css']
})
export class ColorCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  color: Color = new Color();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  tiposColor:{value:string; viewValue:string}[]=[
    {value:'Primario',viewValue:'Primario'},
    {value:'Secundario',viewValue:'Secundario'},
    {value:'Terciario',viewValue:'Terciario'},
  ];

  constructor(private cS:ColorService,private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form=this.formBuilder.group({
      idColor:['',],
      nameColor:['',Validators.required],
      description:['',Validators.required],
      typeColor:['',Validators.required],
    });
  }
  registrar(){
    if(this.form.valid){
      this.color.idColor=this.form.value.idColor;
      this.color.nameColor=this.form.value.nameColor;
      this.color.description=this.form.value.description;
      this.color.typeColor=this.form.value.typeColor;
      if(this.edicion){
        this.cS.update(this.color).subscribe(()=>{
          this.cS.list().subscribe(data=>{
            this.cS.setList(data);
          })
        })
      }else{
        this.cS.insert(this.color).subscribe((data)=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      }this.router.navigate(['components/colors'])
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
      this.cS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          idColor:new FormControl(data.idColor),
          nameColor:new FormControl(data.nameColor),
          description:new FormControl(data.description),
          typeColor:new FormControl(data.typeColor),
        });
      });
    }
  }
}
