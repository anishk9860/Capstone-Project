import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/services/food/food.service';
import { FoodItems } from '../shared/models/foodItem';

@Component({
  selector: 'hinv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods: FoodItems[] = [];

  constructor(private foodItem: FoodService) { }

  ngOnInit(): void {
    this.foods = this.foodItem.getAll();
  }

}
