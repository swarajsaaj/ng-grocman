import { Component, OnInit } from '@angular/core';
import { IGrocery, Grocery } from '../shared/models/grocery.model';
import { Router } from '@angular/router';
import { GroceryService } from '../core/services/grocery.service';

@Component({
  selector: 'gm-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class GroceriesComponent implements OnInit {

  constructor(private router:Router,private groceryService:GroceryService) { }

  groceries:IGrocery[]=[];

  ngOnInit(): void {
    this.groceryService.getAll()
      .subscribe(resp=>{
        this.groceries=resp.sort((a,b)=>b.id-a.id);
      })
  }

  grocerySelected(evt:IGrocery){
    this.router.navigate(['/view',evt.id],)
  }

}
