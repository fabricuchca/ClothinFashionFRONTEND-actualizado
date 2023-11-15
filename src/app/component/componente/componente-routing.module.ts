import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutfitComponent } from '../outfit/outfit.component';
import { OutfitCreaeditaComponent } from '../outfit/outfit-creaedita/outfit-creaedita.component';
import { ClosetComponent } from '../closet/closet.component';
import { ClosetCreaeditaComponent } from '../closet/closet-creaedita/closet-creaedita.component';
import { CommentsComponent } from '../comments/comments.component';
import { CommentsCreaeditaComponent } from '../comments/comments-creaedita/comments-creaedita.component';
import { StoreComponent } from '../store/store.component';
import { StoreCreaeditaComponent } from '../store/store-creaedita/store-creaedita.component';
import { SuscriptionComponent } from '../suscription/suscription.component';
import { SuscriptionCreaeditaComponent } from '../suscription/suscription-creaedita/suscription-creaedita.component';
import { TextureComponent } from '../texture/texture.component';
import { TextureCreaeditaComponent } from '../texture/texture-creaedita/texture-creaedita.component';
import { BrandComponent } from '../brand/brand.component';
import { BrandCreaeditaComponent } from '../brand/brand-creaedita/brand-creaedita.component';
import { ColorComponent } from '../color/color.component';
import { ColorCreaeditaComponent } from '../color/color-creaedita/color-creaedita.component';
import { EventComponent } from '../event/event.component';
import { EventCreaeditaComponent } from '../event/event-creaedita/event-creaedita.component';
import { ClothingComponent } from '../clothing/clothing.component';
import { ClothingCreaditaComponent } from '../clothing/clothing-creaedita/clothing-creaedita.component';
import { TypeclothingComponent } from '../typeclothing/typeclothing.component';
import { TypeclothingCreaeditaComponent } from '../typeclothing/typeclothing-creaedita/typeclothing-creaedita.component';
import { UsersComponent } from '../users/users.component';
import { UsersCreaeditaComponent } from '../users/users-creaedita/users-creaedita.component';
import { RoleComponent } from '../role/role.component';
import { RoleCreaeditaComponent } from '../role/role-creaedita/role-creaedita.component';
import { SeasonComponent } from '../season/season.component';
import { SeasonCreaeditaComponent } from '../season/season-creaedita/season-creaedita.component';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { RecommendationsCreaeditaComponent } from '../recommendations/recommendations-creaedita/recommendations-creaedita.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { ReporteCuchcaComponent } from '../reportes/reporte-cuchca/reporte-cuchca.component';
import { ReporteCasasComponent } from '../reportes/reporte-casas/reporte-casas.component';
import { ReporteSilvestreComponent } from '../reportes/reporte-silvestre/reporte-silvestre.component';

const routes: Routes = [
  {
    path: 'outfits',
    component: OutfitComponent,
    children: [
      { path: 'nuevo', component: OutfitCreaeditaComponent },
      { path: 'ediciones/:id', component: OutfitCreaeditaComponent },
    ],
  },
  {
    path: 'closets',
    component: ClosetComponent,
    children: [
      { path: 'nuevo', component: ClosetCreaeditaComponent },
      { path: 'ediciones/:id', component: ClosetCreaeditaComponent },
    ],
  },
  {
    path: 'comments',
    component: CommentsComponent,
    children: [
      { path: 'nuevo', component: CommentsCreaeditaComponent },
      { path: 'ediciones/:id', component: CommentsCreaeditaComponent },
    ],
  },
  {
    path: 'stores',
    component: StoreComponent,
    children: [
      { path: 'nuevo', component: StoreCreaeditaComponent },
      { path: 'ediciones/:id', component: StoreCreaeditaComponent },
    ],
  },
  {
    path: 'suscriptions',
    component: SuscriptionComponent,
    children: [
      { path: 'nuevo', component: SuscriptionCreaeditaComponent },
      { path: 'ediciones/:id', component: SuscriptionCreaeditaComponent },
    ],
  },
  {
    path: 'textures',
    component: TextureComponent,
    children: [
      { path: 'nuevo', component: TextureCreaeditaComponent },
      { path: 'ediciones/:id', component: TextureCreaeditaComponent },
    ],
  },
  {
    path: 'brands',
    component: BrandComponent,
    children: [
      { path: 'nuevo', component: BrandCreaeditaComponent },
      { path: 'ediciones/:id', component: BrandCreaeditaComponent },
    ],
  },
  {
    path: 'colores',
    component: ColorComponent,
    children: [
      { path: 'nuevo', component: ColorCreaeditaComponent },
      { path: 'ediciones/:id', component: ColorCreaeditaComponent },
    ],
  },
  {
    path: 'events',
    component: EventComponent,
    children: [
      { path: 'nuevo', component: EventCreaeditaComponent },
      { path: 'ediciones/:id', component: EventCreaeditaComponent },
    ],
  },
  {
    path: 'clothings',
    component: ClothingComponent,
    children: [
      { path: 'nuevo', component: ClothingCreaditaComponent },
      { path: 'ediciones/:id', component: ClothingCreaditaComponent },
    ],
  },
  {
    path: 'typeClothings',
    component: TypeclothingComponent,
    children: [
      { path: 'nuevo', component: TypeclothingCreaeditaComponent },
      { path: 'ediciones/:id', component: TypeclothingCreaeditaComponent },
    ],
  },
  {
    path: 'seasons',
    component: SeasonComponent,
    children: [
      { path: 'nuevo', component: SeasonCreaeditaComponent },
      { path: 'ediciones/:id', component: SeasonCreaeditaComponent },
    ],
  },
  {
    path: 'recommendations',
    component: RecommendationsComponent,
    children: [
      { path: 'nuevo', component: RecommendationsCreaeditaComponent },
      { path: 'ediciones/:id', component: RecommendationsCreaeditaComponent },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: 'nuevo', component: UsersCreaeditaComponent },
      { path: 'ediciones/:id', component: UsersCreaeditaComponent },
    ],
  },
  {
    path: 'roles',
    component: RoleComponent,
    children: [
      { path: 'nuevo', component: RoleCreaeditaComponent },
      { path: 'ediciones/:id', component: RoleCreaeditaComponent },
    ],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      { path: 'cuchca', component: ReporteCuchcaComponent },
      { path: 'casas', component: ReporteCasasComponent},
      { path: 'silvestre', component: ReporteSilvestreComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponenteRoutingModule {}
