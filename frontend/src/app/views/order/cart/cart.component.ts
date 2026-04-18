import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {environment} from "../../../../environments/environment";
import {DefaultResponseType} from "../../../../types/default-response.type";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  extraProducts: ProductType[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 24,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        loop: true,
        center: true,
        items: 1,
        margin: 20
      },
      619: {
        items: 2,
      },
      940: {
        items: 3
      },
      1240: {
        items: 4
      }
    },
    nav: false
  }

  cart: CartType | null = null;
  serviceStaticPath = environment.serviceStaticPath;
  totalCount: number = 0;
  totalAmount: number = 0;


  constructor(private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productService.getBestProducts()
      .subscribe((data: ProductType[]) => {
        this.extraProducts = data;
      });


    this.cartService.getCart()
      .subscribe((data: CartType | DefaultResponseType) =>{
        if((data as DefaultResponseType).error !==undefined){
          const error = (data as DefaultResponseType).message;
          throw new Error((data as DefaultResponseType).message);
        }


        this.cart = data as CartType;
        this.calculateTotal();
      })
  }

  calculateTotal() {
    this.totalAmount = 0;
    this.totalCount = 0;

    if (this.cart) {
      this.cart.items.forEach(item => {
        const price = item.product.price;
        const discount = item.product.discount;

        const finalPrice = discount ? price * (1 - discount / 100) : price;

        this.totalAmount += finalPrice * item.quantity;
        this.totalCount += item.quantity;
      });
    }

    this.totalAmount = Math.round(this.totalAmount);
  }

  updateCount(id: string, count: number){
    if(this.cart){
      this.cartService.updateCart(id, count)
        .subscribe((data: CartType | DefaultResponseType) =>{
          if((data as DefaultResponseType).error !==undefined){
            const error = (data as DefaultResponseType).message;
            throw new Error((data as DefaultResponseType).message);
          }
          this.cart = data as CartType;
          this.calculateTotal();
        })
    }
  }

}
