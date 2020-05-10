import { Component, OnInit, FactorySansProvider, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { GroceryService } from 'src/app/core/services/grocery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faCalendarAlt,faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { EditorMode } from './grocery-editor-mode.enum';

@Component({
  selector: 'gm-grocery-editor',
  templateUrl: './grocery-editor.component.html',
  styleUrls: ['./grocery-editor.component.scss']
})
export class GroceryEditorComponent implements OnInit {

  constructor(private groceryService: GroceryService, private router: Router, private route: ActivatedRoute,private ngbDateParserFormatter: NgbDateParserFormatter) { }

  groceryForm: FormGroup;

  mode:EditorMode;

  groceryId:string;

  calendarIcon=faCalendarAlt;
  backIcon=faArrowAltCircleLeft;

  showFailureMsg:boolean=false;

  ngOnInit(): void {
    this.groceryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('', [Validators.required,
      Validators.pattern("^[0-9]*$")]),
      quantity: new FormControl('', [Validators.required,
      Validators.pattern("^[0-9]*$")]),
      manufacturedDate: new FormControl('',[Validators.required]),
      expiryDate: new FormControl('',[Validators.required])
    })
    this.route.url.subscribe(url => {
      this.mode = EditorMode[url[0].path.toUpperCase()];

      if(this.mode===EditorMode.VIEW || this.mode===EditorMode.EDIT){
        if(this.mode===EditorMode.VIEW){
          this.groceryForm.disable();
        }
        this.groceryId=url[1].path;
        this.groceryService.get(parseInt(this.groceryId)).subscribe(res=>{
          if(res.manufacturedDate){
            res.manufacturedDate = this.ngbDateParserFormatter.parse(res.manufacturedDate);
            res.expiryDate = this.ngbDateParserFormatter.parse(res.expiryDate);
          }
          this.groceryForm.patchValue(res);
        },err=>{
          this.showFailureMsg=true;
        })
      }
    })
  }

  isValidField(fieldName: string) {
    const control: AbstractControl = this.groceryForm.get(fieldName);
    return control.invalid && (control.dirty || control.touched) && control.errors.required;
  }

  submit() {
    this.showFailureMsg=false;

    const req = this.groceryForm.value;

    req.manufacturedDate = this.ngbDateParserFormatter.format(req.manufacturedDate);
    req.expiryDate = this.ngbDateParserFormatter.format(req.expiryDate);
    const successCallback: (value: any) => void = res => {
      this.router.navigate(['/']);
    };

    const errorCallback: (error: any) => void = err => {
      this.showFailureMsg=true;
    };
    if(this.mode===EditorMode.EDIT){
      if(this.groceryId){
        req.id=parseInt(this.groceryId)
      }
      this.groceryService.edit(req)
      .subscribe(successCallback,
        errorCallback)
    }else{
      this.groceryService.save(req)
      .subscribe(successCallback,
        errorCallback)
    }
 
  }

  delete(){
    this.groceryService.delete(parseInt(this.groceryId))
    .subscribe(res => {
      this.router.navigate(['/']);
    },
      err => {
        this.showFailureMsg=true;
      })
  }

  get operation(){
    switch(this.mode){
      case EditorMode.VIEW:
        return 'Grocery Details';
      case EditorMode.EDIT:
        return 'Edit Grocery';
      default:
        return 'Add Grocery';
    }
  }
}
