import { Injectable } from '@angular/core';
import {ServicesType} from "../../../types/services-type";
import {GalleryType} from "../../../types/gallery-type";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getServices(): ServicesType[] {
    return [
      {
        image: 'floor.png',
        title: 'Полы',
        service_1: 'Укладка плитки',
        service_2: 'Укладка напольных покрытий',
        service_3: 'Покраска внутри помещения',
        service_4:'Полусухая стяжка пола',
      },
      {
        image: 'corridor.png',
        title: 'Стены',
        service_1: 'Укладка плитки',
        service_2: 'Покраска внутри помещения',
        service_3: 'Поклейка обоев',
        service_4: 'Шпаклевка',
        service_5: 'Штукатурка ',
      },
      {
        image: 'celling1.png',
        title: 'Потолки',
        service_1: 'Грильято (решетчатые)',
        service_2:'Кассетные',
        service_3: 'Реечные',
        service_4:'Гипсокартонные (ГКЛ)',
      },

    ]
  }

  getImages(): GalleryType[] {
    return [
      {
        image_1: '1.png',
        image_2: '2.png',
        image_3: '4.png',
        image_4: '5.png',
        image_5:'1v.png',
      },
      {
        image_1: '6.png',
        image_2: '7.png',
        image_3: '8.png',
        image_4: '9.png',
        image_5:'2v.png',
      },
      {
        image_1: '10.png',
        image_2: '13.png',
        image_3: '14.png',
        image_4: '15.png',
        image_5:'3v.png',
      },
    ]
  }

}
