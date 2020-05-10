import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceriesComponent } from './groceries.component';
import { CoreModule } from '../core/core.module';
import { GroceriesRoutingComponent } from './groceries-routing.module';
import { GroceryEditorComponent } from './grocery-editor/grocery-editor.component';


@NgModule({
  declarations: [GroceryListComponent, GroceriesComponent, GroceryEditorComponent],
  imports: [
    CoreModule,
    CommonModule,
    GroceriesRoutingComponent
  ]
})
export class GroceriesModule { }
