import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteRoutingModule } from './componente-routing.module';
import { EventComponent } from '../event/event.component';
import { ColorComponent } from '../color/color.component';
import { BrandComponent } from '../brand/brand.component';
import { TypeclothingComponent } from '../typeclothing/typeclothing.component';
import { BrandListarComponent } from '../brand/brand-listar/brand-listar.component';
import { TypeclothingListarComponent } from '../typeclothing/typeclothing-listar/typeclothing-listar.component';
import { ClosetComponent } from '../closet/closet.component';
import { CommentsComponent } from '../comments/comments.component';
import { StoreComponent } from '../store/store.component';
import { SuscriptionComponent } from '../suscription/suscription.component';
import { TextureComponent } from '../texture/texture.component';
import { OutfitComponent } from '../outfit/outfit.component';
import { BrandCreaeditaComponent } from '../brand/brand-creaedita/brand-creaedita.component';
import { ClosetCreaeditaComponent } from '../closet/closet-creaedita/closet-creaedita.component';
import { CommentsCreaeditaComponent } from '../comments/comments-creaedita/comments-creaedita.component';
import { OutfitCreaeditaComponent } from '../outfit/outfit-creaedita/outfit-creaedita.component';
import { StoreCreaeditaComponent } from '../store/store-creaedita/store-creaedita.component';
import { SuscriptionCreaeditaComponent } from '../suscription/suscription-creaedita/suscription-creaedita.component';
import { TextureCreaeditaComponent } from '../texture/texture-creaedita/texture-creaedita.component';
import { ClosetListarComponent } from '../closet/closet-listar/closet-listar.component';
import { CommentsListarComponent } from '../comments/comments-listar/comments-listar.component';
import { OutfitListarComponent } from '../outfit/outfit-listar/outfit-listar.component';
import { StoreListarComponent } from '../store/store-listar/store-listar.component';
import { SuscriptionListarComponent } from '../suscription/suscription-listar/suscription-listar.component';
import { TextureListarComponent } from '../texture/texture-listar/texture-listar.component';
import { ColorCreaeditaComponent } from '../color/color-creaedita/color-creaedita.component';
import { ColorListarComponent } from '../color/color-listar/color-listar.component';
import { EventListarComponent } from '../event/event-listar/event-listar.component';
import { EventCreaeditaComponent } from '../event/event-creaedita/event-creaedita.component';
import { ClothingComponent } from '../clothing/clothing.component';
import { ClothingListarComponent } from '../clothing/clothing-listar/clothing-listar.component';
import { ClothingCreaditaComponent } from '../clothing/clothing-creaedita/clothing-creaedita.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { TypeclothingCreaeditaComponent } from '../typeclothing/typeclothing-creaedita/typeclothing-creaedita.component';
import { UsersComponent } from '../users/users.component';
import { UsersListarComponent } from '../users/users-listar/users-listar.component';
import { UsersCreaeditaComponent } from '../users/users-creaedita/users-creaedita.component';
import { RoleCreaeditaComponent } from '../role/role-creaedita/role-creaedita.component';
import { RoleListarComponent } from '../role/role-listar/role-listar.component';
import { SeasonListarComponent } from '../season/season-listar/season-listar.component';
import { SeasonCreaeditaComponent } from '../season/season-creaedita/season-creaedita.component';
import { SeasonComponent } from '../season/season.component';
import { RoleComponent } from '../role/role.component';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { RecommendationsListarComponent } from '../recommendations/recommendations-listar/recommendations-listar.component';
import { RecommendationsCreaeditaComponent } from '../recommendations/recommendations-creaedita/recommendations-creaedita.component';
import { NgChartsModule } from 'ng2-charts';
import { ReportesComponent } from '../reportes/reportes.component';
import { ReporteCuchcaComponent } from '../reportes/reporte-cuchca/reporte-cuchca.component';
import { ReporteCasasComponent } from '../reportes/reporte-casas/reporte-casas.component';
import { ReporteSilvestreComponent } from '../reportes/reporte-silvestre/reporte-silvestre.component';

@NgModule({
  declarations: [
    EventComponent,
    ColorComponent,
    BrandComponent,
    TypeclothingComponent,
    BrandListarComponent,
    TypeclothingListarComponent,
    ClosetComponent,
    CommentsComponent,
    StoreComponent,
    SuscriptionComponent,
    TextureComponent,
    OutfitComponent,
    BrandCreaeditaComponent,
    ClosetCreaeditaComponent,
    CommentsCreaeditaComponent,
    OutfitCreaeditaComponent,
    StoreCreaeditaComponent,
    SuscriptionCreaeditaComponent,
    TextureCreaeditaComponent,
    ClosetListarComponent,
    CommentsListarComponent,
    OutfitListarComponent,
    StoreListarComponent,
    SuscriptionListarComponent,
    TextureListarComponent,
    ColorCreaeditaComponent,
    ColorListarComponent,
    EventListarComponent,
    EventCreaeditaComponent,
    ClothingComponent,
    ClothingListarComponent,
    ClothingCreaditaComponent,
    TypeclothingCreaeditaComponent,
    UsersComponent,
    UsersListarComponent,
    UsersCreaeditaComponent,
    RoleCreaeditaComponent,
    RoleListarComponent,
    SeasonListarComponent,
    SeasonCreaeditaComponent,
    SeasonComponent,
    RoleComponent,
    RecommendationsComponent,
    RecommendationsListarComponent,
    RecommendationsCreaeditaComponent,
    ReportesComponent,
    ReporteCuchcaComponent,
    ReporteCasasComponent,
    ReporteSilvestreComponent
  ],
  imports: [
    CommonModule,
    ComponenteRoutingModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    MatCardModule,
    MatOptionModule,
    NgChartsModule,
  ],
  bootstrap: [ComponenteModule],
})
export class ComponenteModule {}
