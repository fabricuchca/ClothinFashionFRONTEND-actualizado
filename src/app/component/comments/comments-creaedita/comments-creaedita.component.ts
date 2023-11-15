import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Comments } from 'src/app/model/comments';
import { Outfit } from 'src/app/model/outfit';
import { Users } from 'src/app/model/users';
import { CommentsService } from 'src/app/service/comments.service';
import { OutfitService } from 'src/app/service/outfit.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-comments-creaedita',
  templateUrl: './comments-creaedita.component.html',
  styleUrls: ['./comments-creaedita.component.css']
})
export class CommentsCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  comments: Comments = new Comments();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  dateComment = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;
  listaOutfits: Outfit[]=[];
  listaUsers: Users[]=[];
  constructor(
    private cS: CommentsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private oS: OutfitService,
    private uS: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idComments: [''],
      titleComment: ['', Validators.required],
      descriptionComment: ['', Validators.required],
      dateComment: ['', Validators.required],
      score: ['', Validators.required],
      outfit: ['', Validators.required],
      users: ['',Validators.required],
    });
    this.oS.list().subscribe(data=>{
      this.listaOutfits=data
    })
    ;
    this.uS.list().subscribe(data=>{
      this.listaUsers=data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.comments.idComments = this.form.value.idComments;
      this.comments.titleComment = this.form.value.titleComment;
      this.comments.descriptionComment = this.form.value.descriptionComment;
      this.comments.dateComment = this.form.value.dateComment;
      this.comments.score = this.form.value.score;
      this.comments.outfit.idOutfit = this.form.value.outfit;
      this.comments.users.idUser = this.form.value.users;
      if (this.edicion) {
        this.cS.update(this.comments).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comments).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/comments']);
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
          idComments: new FormControl(data.idComments, Validators.required),
          titleComment: new FormControl(data.titleComment, Validators.required),
          descriptionComment: new FormControl(data.descriptionComment, Validators.required),
          dateComment: new FormControl(data.dateComment, Validators.required),
          score: new FormControl(data.score, Validators.required),
          outfit: new FormControl(data.outfit.idOutfit, Validators.required),
          users: new FormControl(data.users.idUser, Validators.required),
        });
      });
    }
  }
}
