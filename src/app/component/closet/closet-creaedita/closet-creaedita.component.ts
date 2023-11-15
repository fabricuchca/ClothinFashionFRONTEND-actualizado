import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Closet } from 'src/app/model/closet';
import { ClosetService } from 'src/app/service/closet.service';

@Component({
  selector: 'app-closet-creaedita',
  templateUrl: './closet-creaedita.component.html',
  styleUrls: ['./closet-creaedita.component.css']
})
export class ClosetCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  closet: Closet = new Closet();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private cS: ClosetService,
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
      idCloset: [''],
      styleCloset: ['', Validators.required],
      nameCloset: ['', Validators.required],
      users: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.closet.idCloset = this.form.value.idCloset;
      this.closet.styleCloset = this.form.value.styleCloset;
      this.closet.nameCloset = this.form.value.nameCloset;
      this.closet.users = this.form.value.users;
      if (this.edicion) {
        this.cS.update(this.closet).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.closet).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/closets']);
    } else {
      this.mensaje = 'Revise los campos!!!';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCloset: new FormControl(data.idCloset, Validators.required),
          styleCloset: new FormControl(data.styleCloset, Validators.required),
          nameCloset: new FormControl(data.nameCloset, Validators.required),
          users: new FormControl(data.users, Validators.required)
        });
      });
    }
  }
}
