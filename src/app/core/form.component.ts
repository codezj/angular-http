import { Component ,Inject,inject} from "@angular/core";
import { NgForm } from "@angular/forms";
import { TitleStrategy } from "@angular/router";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { filter,map,distinctUntilChanged,skipWhile } from "rxjs/operators";

@Component({
    selector: "paForm",
    templateUrl: "from.component.html",
    styleUrls: ["from.component.css"]
})

export class FormComponent{
    product: Product = new Product();
    //lastId: number | undefined;

    editing: boolean = false;
    constructor(private model: Model, 
        @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>)
        {

            console.log(stateEvents,'stateEvents');
            
            
            stateEvents
            .pipe(map(state => new SharedState(state.mode, state.id == 5 ? 1 : state.id)))
            // .pipe(map(state => state.mode == MODES.EDIT? state.id  : -1))
            // .pipe(skipWhile(state => state.mode == MODES.EDIT))
            // .pipe(distinctUntilChanged((firstState, secondState) =>
            // firstState.mode == secondState.mode && firstState.id == secondState.id))
            // .pipe(filter(id => id !=3 ))
            .subscribe((update) =>{
             
                
                // this.editing = id != -1
                this.product = new Product()
                if(update.id != undefined) {
                    Object.assign(this.product, this.model.getProduct(update.id));
                }

                this.editing = update.mode == MODES.EDIT;
            });
        }


    // get editing(): boolean {
    //     return this.state.mode == MODES.EDIT;
    // }

    submitForm(form: NgForm){
        
        
        
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.product = new Product();
            form.reset()
        }
    }

    resetForm(){
        this.product = new Product();
    }

    // ngDoCheck(){
    //     if (this.lastId != this.state.id){
    //         this.product = new Product();
    //         if (this.state.mode == MODES.EDIT){
    //             Object.assign(this.product, this.model.getProduct(this.state.id));
    //         }
    //         this.lastId = this.state.id;
    //     }
    // }
}