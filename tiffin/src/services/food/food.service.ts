import { Injectable } from '@angular/core';
import { FoodItems } from 'src/app/shared/models/foodItem';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): FoodItems[] {
    return [
      {
        id: 1,
        price: 10,
        name: "Rick",
        tags: ["Caribbean"],
        imageUrl: "assets/Food_2.jpg",
        rating: 4.2
      },
      {
        id: 2,
        price: 15,
        name: "Namita",
        tags: ["North Indian", "South Indian"],
        imageUrl: "assets/Food_3.jpg",
        rating: 4.3
      },

      {
        id: 3,
        price: 13,
        name: "Josh",
        tags: ["American"],
        imageUrl: "assets/Food_4.jpg",
        rating: 4.6
      },

      {
        id: 4,
        price: 11,
        name: "Harry",
        tags: ["American"],
        imageUrl: "assets/Food_1.jpg",
        rating: 4.6
      },

      {
        id: 5,
        price: 12,
        name: "Alex",
        tags: ["Chinese"],
        imageUrl: "assets/Food_5.jpg",
        rating: 4.8
      }
      
    ]
  }

}

