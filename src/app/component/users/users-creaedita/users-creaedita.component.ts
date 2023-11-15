import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users-creaedita',
  templateUrl: './users-creaedita.component.html',
  styleUrls: ['./users-creaedita.component.css']
})
export class UsersCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  users: Users = new Users();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  birthDate = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private cS: UsersService,
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
      idUser: [''],
      nameUser: ['', Validators.required],
      lastNameUser: ['', Validators.required],
      addressUser: ['', Validators.required],
      cardUser: [''],
      telephoneUser: ['', Validators.required],
      mail: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: ['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.users.idUser = this.form.value.idUser;
      this.users.nameUser = this.form.value.nameUser;
      this.users.birthDate = this.form.value.birthDate;
      this.users.cardUser = this.form.value.cardUser;
      this.users.telephoneUser = this.form.value.telephoneUser;
      this.users.mail = this.form.value.mail;
      this.users.username = this.form.value.username;
      this.users.password = this.form.value.password;
      this.users.enabled = this.form.value.enabled;
      this.users.lastNameUser = this.form.value.lastNameUser;
      this.users.addressUser = this.form.value.addressUser;
      if (this.edicion) {
        this.cS.update(this.users).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.users).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/users']);
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
          idUser: new FormControl(data.idUser, Validators.required),
          nameUser: new FormControl(data.nameUser, Validators.required),
          birthDate: new FormControl(data.birthDate, Validators.required),
          cardUser: new FormControl(data.cardUser),
          telephoneUser: new FormControl(data.telephoneUser, Validators.required),
          mail: new FormControl(data.mail, Validators.required),
          username: new FormControl(data.username, Validators.required),
          password: new FormControl(data.password, Validators.required),
          enabled: new FormControl(data.enabled, Validators.required),
          lastNameUser: new FormControl(data.lastNameUser, Validators.required),
          addressUser: new FormControl(data.addressUser, Validators.required),
        });
      });
    }
  }
}
