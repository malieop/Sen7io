import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Homepage/homepage.component';
import { RoutePageComponent } from './RoutePage/routepage.component';
import { SubmitComponent } from './Submit/submit.component';

// este routes não tem nada haver com o routes utilizado no resto do código
// este é predefenido para fazer as rotas no site
// Aqui adicionamos rotas, exemplo localhost:4200/routes
// para adicionar algo como o exemplo fazemos como na segunda linha do routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'routes', component: RoutePageComponent},
  {path: 'submit', component: SubmitComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
