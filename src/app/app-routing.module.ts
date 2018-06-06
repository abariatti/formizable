import { NgDynamicFormsComponent } from './pages/ng-dynamic-forms/ng-dynamic-forms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dynamic-forms', pathMatch: 'full' },
  { path: 'dynamic-forms', component: NgDynamicFormsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
