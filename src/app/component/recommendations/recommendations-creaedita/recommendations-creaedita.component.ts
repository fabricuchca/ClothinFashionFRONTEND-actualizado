import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recommendations } from 'src/app/model/recommendations';
import { Users } from 'src/app/model/users';
import { RecommendationsService } from 'src/app/service/recommendations.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-recommendations-creaedita',
  templateUrl: './recommendations-creaedita.component.html',
  styleUrls: ['./recommendations-creaedita.component.css']
})
export class RecommendationsCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  recommendations: Recommendations = new Recommendations();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaUsers: Users[]=[];

  constructor(
    private cS: RecommendationsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private oS: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idRecommendations: [''],
      title: ['', Validators.required],
      calification: ['', Validators.required],
      addicionalLink: [''],
      categoryTag: ['', Validators.required],
      users: ['', Validators.required]
    });
    this.oS.list().subscribe(data=>{
      this.listaUsers=data
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.recommendations.idRecommendations = this.form.value.idRecommendations;
      this.recommendations.title = this.form.value.title;
      this.recommendations.calification = this.form.value.calification;
      this.recommendations.addicionalLink = this.form.value.addicionalLink;
      this.recommendations.categoryTag = this.form.value.categoryTag;
      this.recommendations.users.idUser = this.form.value.users;
      if (this.edicion) {
        this.cS.update(this.recommendations).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.recommendations).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/recommendations']);
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
          idRecommendations: new FormControl(data.idRecommendations, Validators.required),
          title: new FormControl(data.title, Validators.required),
          calification: new FormControl(data.calification, Validators.required),
          addicionalLink: new FormControl(data.addicionalLink),
          categoryTag: new FormControl(data.categoryTag, Validators.required),
          users: new FormControl(data.users, Validators.required)
        });
      });
    }
  }
}
