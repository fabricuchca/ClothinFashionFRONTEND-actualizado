import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';
import { Store } from 'src/app/model/store';

@Component({
  selector: 'app-store-creaedita',
  templateUrl: './store-creaedita.component.html',
  styleUrls: ['./store-creaedita.component.css']
})
export class StoreCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  store: Store = new Store();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private cS: StoreService,
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
      idStore: [''],
      nameStore: ['', Validators.required],
      telephoneStore: ['', Validators.required],
      postalCode: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      catalogStore: ['', Validators.required],
      addressStore: ['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.store.idStore = this.form.value.idStore;
      this.store.nameStore = this.form.value.nameStore;
      this.store.telephoneStore = this.form.value.telephoneStore;
      this.store.postalCode = this.form.value.postalCode;
      this.store.paymentMethod = this.form.value.paymentMethod;
      this.store.latitude = this.form.value.latitude;
      this.store.longitude = this.form.value.longitude;
      this.store.catalogStore = this.form.value.catalogStore;
      this.store.addressStore = this.form.value.addressStore;
      if (this.edicion) {
        this.cS.update(this.store).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.store).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/stores']);
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
          idStore: new FormControl(data.idStore, Validators.required),
          nameStore: new FormControl(data.nameStore, Validators.required),
          telephoneStore: new FormControl(data.telephoneStore, Validators.required),
          postalCode: new FormControl(data.postalCode, Validators.required),
          paymentMethod: new FormControl(data.paymentMethod, Validators.required),
          latitude: new FormControl(data.latitude, Validators.required),
          longitude: new FormControl(data.longitude, Validators.required),
          catalogStore: new FormControl(data.catalogStore, Validators.required),
          addressStore: new FormControl(data.addressStore, Validators.required)
        });
      });
    }
  }
}
