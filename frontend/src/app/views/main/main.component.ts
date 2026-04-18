import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ProductType} from "../../../types/product.type";
import {OwlOptions} from "ngx-owl-carousel-o";
import {ServicesType} from "../../../types/services-type";
import {DataService} from "../../shared/services/data.service";
import {GalleryType} from "../../../types/gallery-type";
import {Fancybox} from "@fancyapps/ui";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  products: ProductType[] = [];
  services: ServicesType[] = [];
  images: GalleryType[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 20,
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

  customOptionsCarousel: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    margin: 0,
    navText: ['', ''],
    items: 1,
    nav: false,
    responsive: {
      0: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
      }
    },
  }

  constructor(private productService: ProductService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.productService.getBestProducts()
      .subscribe((data: ProductType[]) => {
        this.products = data;
      })

    this.services = this.dataService.getServices();
    this.images = this.dataService.getImages();
  }

  ngAfterViewInit() {
    Fancybox.bind('[data-fancybox]');
  }

}
