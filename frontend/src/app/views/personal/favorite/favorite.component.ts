import { Component, OnInit } from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite-type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";
import {ProductType} from "../../../../types/product.type";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  cart: CartType | null = null;

  products: FavoriteType[] = [];
  serviceStaticPath = environment.serviceStaticPath;
  product!: ProductType;
  count: number = 1;
  countInCart: number | undefined = 0;


  constructor(private favoriteService: FavoriteService,
              private cartService: CartService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.getIsLoggedIn()) {
      return;
    }


    this.cartService.getCart()
      .subscribe((cartData: CartType | DefaultResponseType) => {

        if((cartData as DefaultResponseType).error !== undefined){
          throw new Error((cartData as DefaultResponseType).message);
        }

        this.cart = cartData as CartType;

        this.favoriteService.getFavorites()
          .subscribe((favData: FavoriteType[] | DefaultResponseType) =>{
            if((favData as DefaultResponseType).error !== undefined){
              throw new Error((favData as DefaultResponseType).message);
            }

            this.products = favData as FavoriteType[];

            // Добавляем поле countInCart
            if(this.cart){
              this.products = this.products.map(prod => {
                const item = this.cart!.items.find(i => i.product.id === prod.id);
                if(item){
                  (prod as any).countInCart = item.quantity;
                }
                return prod;
              });
            }
          })
      });

  }


  removeFromFavorites(id: string){
    this.favoriteService.removeFavorite(id)
      .subscribe((data: DefaultResponseType) =>{
        if(data.error){
          //выводим ошибку в консол или снекбар
          throw new Error(data.message);
        }

        this.products = this.products.filter(item => item.id !==id);
      })
  }

  addToCart(product: FavoriteType){
    const count = 1;
    this.cartService.updateCart(product.id, count)
      .subscribe((data: CartType | DefaultResponseType)=>{
        (product as any).countInCart = count;
        if((data as DefaultResponseType).error !== undefined){
          throw new Error((data as DefaultResponseType).message);
        }

        (product as any).countInCart = count;
      });
  }


  updateCount(product: FavoriteType, value: number){
    if(value === 0){
      // удаляем из корзины
      this.cartService.updateCart(product.id, 0)
        .subscribe((data: CartType | DefaultResponseType)=>{
          if((data as DefaultResponseType).error !== undefined){
            throw new Error((data as DefaultResponseType).message);
          }

          (product as any).countInCart = 0;
        })
    } else {
      // обновляем количество
      this.cartService.updateCart(product.id, value)
        .subscribe((data: CartType | DefaultResponseType)=>{
          if((data as DefaultResponseType).error !== undefined){
            throw new Error((data as DefaultResponseType).message);
          }

          (product as any).countInCart = value;
        })
    }
  }



}
