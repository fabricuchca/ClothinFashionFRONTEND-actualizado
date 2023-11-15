import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Texture } from 'src/app/model/texture';
import { TextureService } from 'src/app/service/texture.service';

@Component({
  selector: 'app-texture-creaedita',
  templateUrl: './texture-creaedita.component.html',
  styleUrls: ['./texture-creaedita.component.css']
})
export class TextureCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  texture: Texture = new Texture();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  creationDate = new FormControl(new Date());
  constructor(
    private cS: TextureService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params ) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idTexture: [''],
      nameTexture: ['', Validators.required],
      material: ['', Validators.required],
      creationDate: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.texture.idTexture = this.form.value.idTexture;
      this.texture.nameTexture = this.form.value.nameTexture;
      this.texture.creationDate = this.form.value.creationDate;
      this.texture.material = this.form.value.material;
      if (this.edicion) {
        this.cS.update(this.texture).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.texture).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/textures']);
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
          idTexture: new FormControl(data.idTexture, Validators.required),
          nameTexture: new FormControl(data.nameTexture, Validators.required),
          creationDate: new FormControl(data.creationDate, Validators.required),
          material: new FormControl(data.material, Validators.required),
       });
     });
   }
  }
}
