import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { RestDataSource } from "./rest.datasource";
//import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
   private products: Product[] = [];
   private categories: any[] = [];

   constructor(private dataSource: RestDataSource) {
      dataSource.getProducts().subscribe(data => {
         this.products = data;
         let cat = data.map(p => p.category)
            .filter((c, index, array) => array.indexOf(c) == index).sort();
         if (cat)
            this.categories = cat;
         else
            this.categories = [];
      });
   }

   getProducts(category: any = null): Product[] {
      return this.products
         .filter(p => category == null || category == p.category);
   }

   getProduct(id: number): Product {
      let prod = this.products.find(p => p.id == id);
      if (prod)
         return prod;
      return new Product;
   }

   getCategories(): string[] {
      return this.categories;
   }

   saveProduct(product: Product) {
      if (product.id == null || product.id == 0) {
         this.dataSource.saveProduct(product)
            .subscribe(p => this.products.push(p));
      } else {
         this.dataSource.updateProduct(product)
            .subscribe(p => {
               this.products.splice(this.products.
                  findIndex(p => p.id == product.id), 1, product);
            });
      }
   }

   deleteProduct(id: number | any) {
      this.dataSource.deleteProduct(id).subscribe(p => {
         this.products.splice(this.products.
            findIndex(p => p.id == id), 1);
      })
   }
}
