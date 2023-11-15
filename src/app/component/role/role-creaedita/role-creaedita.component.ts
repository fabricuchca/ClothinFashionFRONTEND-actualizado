import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Role } from 'src/app/model/role';
import { Users } from 'src/app/model/users';
import { RoleService } from 'src/app/service/role.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-role-creaedita',
  templateUrl: './role-creaedita.component.html',
  styleUrls: ['./role-creaedita.component.css']
})
export class RoleCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaUsers: Users[]=[];
  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cS: RoleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idRole: [''],
      rol: ['', Validators.required],
      user: ['', Validators.required]
    });
    this.uS.list().subscribe(data=>{
      this.listaUsers=data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.role.idRole = this.form.value.idRole;
      this.role.rol = this.form.value.rol;
      this.role.user = this.form.value.user;
      if (this.edicion) {
        this.cS.update(this.role).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.role).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/roles']);
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
          idRole: new FormControl(data.idRole, Validators.required),
          rol: new FormControl(data.rol, Validators.required),
          user: new FormControl(data.user, Validators.required),
        });
      });
    }
  }
}
