import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Outfit } from 'src/app/model/outfit';
import { OutfitService } from 'src/app/service/outfit.service';
import * as moment from 'moment';
import { Catalog } from 'src/app/model/catalog';
import { CatalogService } from 'src/app/service/catalog.service';

@Component({
  selector: 'app-outfit-creaedita',
  templateUrl: './outfit-creaedita.component.html',
  styleUrls: ['./outfit-creaedita.component.css']
})
export class OutfitCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  outfit: Outfit = new Outfit();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  creationDate = new FormControl(new Date());
  listaCatalog: Catalog[]=[];

  constructor(
    private cS: OutfitService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private oS: CatalogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idOutfit: [''],
      nameOutfit: ['', Validators.required],
      styleOutfit: ['', Validators.required],
      clothesNumber: ['', Validators.required],
      creationDate: ['', Validators.required],
      catalog: ['', Validators.required]
    });
    this.oS.list().subscribe(data=>{
      this.listaCatalog=data
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.outfit.idOutfit = this.form.value.idOutfit;
      this.outfit.nameOutfit = this.form.value.nameOutfit;
      this.outfit.styleOutfit = this.form.value.styleOutfit;
      this.outfit.clothesNumber = this.form.value.clothesNumber;
      this.outfit.creationDate = this.form.value.creationDate;
      this.outfit.catalog.idCatalog = this.form.value.catalog;
      if (this.edicion) {
        this.cS.update(this.outfit).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.outfit).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/outfits']);
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
          idOutfit: new FormControl(data.idOutfit, Validators.required),
          nameOutfit: new FormControl(data.nameOutfit, Validators.required),
          styleOutfit: new FormControl(data.styleOutfit, Validators.required),
          clothesNumber: new FormControl(data.clothesNumber, Validators.required),
          creationDate: new FormControl(data.creationDate, Validators.required),
          catalog: new FormControl(data.catalog, Validators.required)
        });
      });
    }
  }
}
