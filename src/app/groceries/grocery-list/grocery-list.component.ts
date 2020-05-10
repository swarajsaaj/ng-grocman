import { Component, OnInit, Input, Output, EventEmitter, Directive, ViewChildren, QueryList } from '@angular/core';
import { IGrocery } from 'src/app/shared/models/grocery.model';

@Component({
  selector: 'gm-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  constructor() { }
  
  groceryList:IGrocery[]=[];

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  pageSizes=[5,10,50];

  @Input()
  set groceries(list:IGrocery[]){
    this.groceryList=list;
    this.collectionSize = this.groceryList.length;
  }

  get groceries(): IGrocery[] {
    return this.groceryList
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  @Output()
  selected:EventEmitter<IGrocery> = new EventEmitter<IGrocery>();
  
  ngOnInit(): void {
  }

  itemClicked(grocery:IGrocery){
    this.selected.emit(grocery);
  }

}
