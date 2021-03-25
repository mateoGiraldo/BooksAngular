import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrosComponent } from './components/libros/libros.component';


const routes: Routes = [
  {path: 'libros', component: LibrosComponent },
  {path: 'home', component: LibrosComponent },
  {path: '**', redirectTo : 'libros' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
