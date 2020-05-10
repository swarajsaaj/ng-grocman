import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroceryEditorComponent } from './grocery-editor/grocery-editor.component';


const routes: Routes = [
  {
    path:'view/:id',
    component:GroceryEditorComponent
  },
  {
    path:'edit/:id',
    component:GroceryEditorComponent
  },
  {
    path:'add',
    component:GroceryEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GroceriesRoutingComponent { }
