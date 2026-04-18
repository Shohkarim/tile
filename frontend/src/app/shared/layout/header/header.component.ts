import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";
import {CartService} from "../../services/cart.service";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../../../types/product.type";
import {environment} from "../../../../environments/environment";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchField = new FormControl();
  showSearch: boolean = false;
  products: ProductType[] = [];
 // searchValue: string = '';
  isLogged: boolean = false;
  count: number = 0;
  serviceStaticPath = environment.serviceStaticPath;

  isLogged$ = this.authService.isLogged$;

  isOpen = false;

  @Input() categories: CategoryWithTypeType[] = [];


  constructor(private authService: AuthService,
              private cartService: CartService,
              private _snackBar: MatSnackBar,
              private productService: ProductService,
              private loaderService: LoaderService,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
     this.searchField.valueChanges
       .pipe(
         debounceTime(500)
       )
       .subscribe(value => {
         if (value && value.length > 2) {
               this.productService.searchProducts(value)
                 .subscribe((data: ProductType[]) => {
                   this.products = data;
                   this.showSearch = true;
                 })
             }else {
               this.products = [];
             }
       })


    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;

      if (isLoggedIn) {
        this.cartService.getCartCount().subscribe();
      } else {
        this.cartService.clearCart();
      }
    });

    this.cartService.getCartCount()
      .subscribe((data: { count: number } | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }

        this.count = (data as { count: number }).count;


      })
    this.cartService.count$
      .subscribe(count => {
        this.count = count;
      })
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open('Ошибка выхода из системы');
            throw new Error(data.message);
          }

          this.doLogout();

        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка выхода из системы');
          }
        }


      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.cartService.clearCart();
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/'])
  }

  // changedSearchValue(newValue: string) {
  //   this.searchValue = newValue;
  //
  //   if (this.searchValue && this.searchValue.length > 2) {
  //     this.productService.searchProducts(this.searchValue)
  //       .subscribe((data: ProductType[]) => {
  //         this.products = data;
  //       })
  //   }else {
  //     this.products = [];
  //   }
  // }

  selectProduct(url: string){
     this.router.navigate(['/product/' + url]);
     this.searchField.setValue('');
     this.products = [];
  }

  // changeShowedSearch(value: boolean){
  //   setTimeout(() =>{
  //     this.showSearch = value;
  //   }, 500);
  //
  //
  // }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

}
