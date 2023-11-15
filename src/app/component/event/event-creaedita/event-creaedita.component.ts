import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-creaedita',
  templateUrl: './event-creaedita.component.html',
  styleUrls: ['./event-creaedita.component.css']
})
export class EventCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  event: Event = new Event();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private eS: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idEvent: ['',],
      theme: ['', Validators.required],
      descriptionEvent: ['', Validators.required],
    });
  }

  registrar(){
    if(this.form.valid){
      this.event.idEvent=this.form.value.idEvent;
      this.event.theme=this.form.value.theme;
      this.event.descriptionEvent=this.form.value.descriptionEvent;
      if(this.edicion){
        this.eS.update(this.event).subscribe(()=>{
          this.eS.list().subscribe(data=>{
            this.eS.setList(data);
          })
        })
      }else{
        this.eS.insert(this.event).subscribe((data)=>{
          this.eS.list().subscribe((data)=>{
            this.eS.setList(data);
          });
        });
      }this.router.navigate(['components/events']);
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
  init() {
    if(this.edicion){
      this.eS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          idEvent:new FormControl(data.idEvent),
          theme:new FormControl(data.theme),
          descriptionEvent:new FormControl(data.descriptionEvent),
        });
      });
    }
  }
}
