import { Suscription } from './../../../model/suscription';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SuscriptionService } from 'src/app/service/suscription.service';
import * as moment from 'moment';
import { UsersService } from 'src/app/service/users.service';
import { Users } from 'src/app/model/users';

@Component({
  selector: 'app-suscription-creaedita',
  templateUrl: './suscription-creaedita.component.html',
  styleUrls: ['./suscription-creaedita.component.css']
})
export class SuscriptionCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  suscription: Suscription = new Suscription();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  paymentDate = new FormControl(new Date());
  startSuscription = new FormControl(new Date());
  listaUsers:Users[]=[]
  constructor(
    private cS: SuscriptionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idSuscription: [''],
      amount: ['', Validators.required],
      paymentDate: ['', Validators.required],
      state: ['', Validators.required],
      startSuscription: ['', Validators.required],
      users: ['', Validators.required]
    });
    this.uS.list().subscribe(data=>{
      this.listaUsers=data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.suscription.idSuscription = this.form.value.idSuscription;
      this.suscription.amount = this.form.value.amount;
      this.suscription.paymentDate = this.form.value.paymentDate;
      this.suscription.state = this.form.value.state;
      this.suscription.startSuscription = this.form.value.startSuscription;
      this.suscription.users = this.form.value.users;
      if (this.edicion) {
        this.cS.update(this.suscription).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.suscription).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/suscriptions']);
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
          idSuscription: new FormControl(data.idSuscription, Validators.required),
          amount: new FormControl(data.amount, Validators.required),
          paymentDate: new FormControl(data.paymentDate, Validators.required),
          state: new FormControl(data.state, Validators.required),
          startSuscription: new FormControl(data.startSuscription, Validators.required),
          users: new FormControl(data.users, Validators.required)
        });
      });
    }
  }
}
