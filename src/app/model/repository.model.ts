import { Product } from "./product.model";
// import { StaticDataSource } from "./static.datasource";
import {Injectable} from "@angular/core"
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";


@Injectable()
export class Model {
    // private dataSoure: SimpleDataSource;
    // private products: Product[];
    private products: Product[] = new Array<Product>();
    private locator = (p: Product, id: number | undefined) => p.id === id;

    constructor(private dataSource: RestDataSource){
        // this.dataSoure = new SimpleDataSource;
        // this.products = new Array<Product>();
        // this.dataSource.getData().forEach(p=> this.products.push(p));
        this.dataSource.getData().subscribe(data => this.products = data);
        
    }

    
    getProducts(): Product[] {
        
        
        return this.products;
    }

    getProduct(id: number | undefined): any {

        return this.products.find(p => this.locator(p, id));
    }

    saveProduct (product: any){
        let indexModify = this.products.findIndex(p => this.locator(p, product.id)) + 1;
        console.log(indexModify);
        
        if (product.id != indexModify || product.id == null ){
            // product.id = this.generateID();
            this.dataSource.saveProduct(product)
            .subscribe(p => this.products.push(p))

            
            
            // this.products.push(product);

        }else {

            this.dataSource.updateProduct(product).subscribe(p =>{
                let index = this.products.findIndex(item => this.locator(item, p.id));

                this.products.splice(index, 1, product);
            })
            // let index = this.products.findIndex(p => this.locator(p, product.id));
            // this.products.splice(index, 1, product);
            
        }
    }

    deleteProduct(id: number | undefined){
       
        // let index = this.products.findIndex(p => this.locator(p, id));
        // if (index > -1){
        //     this.products.splice(index, 1)
        // }

        this.dataSource.deleteProduct(id).subscribe(()=>{
            let index = this.products.findIndex(p=>this.locator(p,id));

            if (index > -1){
                this.products.splice(index, 1);
            }
        })


    }


    private generateID(): number {
        console.log('####candidate value is fixed, need to make to be accumulated...####');
        
        let candidate = 6;
        while (this.getProduct(candidate) != null){
            console.log(this.getProduct(candidate));
            
            candidate ++;
        }
        
        return candidate;
    }
}