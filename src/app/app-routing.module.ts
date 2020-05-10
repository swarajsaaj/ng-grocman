import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroceriesComponent } from './groceries/groceries.component';


const routes: Routes = [{
  path:'',
  component:GroceriesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
