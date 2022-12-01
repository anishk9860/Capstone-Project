import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_LOCATION_KEY = 'user-location';
const MERCHANT_INFO_KEY = 'merchant-info';
const USER_INFO_KEY = 'user-info';
const MERCHANT_FOOD_ITEMS_KEY = 'merchant-food-items';
const FOOD_ITEMS_KEY = 'food-items';
const MERCHANT_LIST_BY_LOCATION_KEY = 'merchant-list-by-location';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveUserLocation(location: any): void {
    window.sessionStorage.removeItem(USER_LOCATION_KEY);
    window.sessionStorage.setItem(USER_LOCATION_KEY, JSON.stringify(location));
  }

  public getUserLocation(): any {
    const location = window.sessionStorage.getItem(USER_LOCATION_KEY);
    if (location) {
      return JSON.parse(location);
    }
    return {};
  }

  public saveMerchantInfo(merchantInfo: any): void {
    window.sessionStorage.removeItem(MERCHANT_INFO_KEY);
    window.sessionStorage.setItem(MERCHANT_INFO_KEY, JSON.stringify(merchantInfo));
  }

  public getMerchantInfo(): any {
    const merchantInfo = window.sessionStorage.getItem(MERCHANT_INFO_KEY);
    if (merchantInfo) {
      return JSON.parse(merchantInfo);
    }
    return {};
  }

  public saveUserInfo(userInfo: any): void {
    window.sessionStorage.removeItem(USER_INFO_KEY);
    window.sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }

  public getUserInfo(): any {
    const userInfo = window.sessionStorage.getItem(USER_INFO_KEY);
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return {};
  }

  public saveMerchantFoodItems(merchantFoodItems: any): void {
    window.sessionStorage.removeItem(MERCHANT_FOOD_ITEMS_KEY);
    window.sessionStorage.setItem(MERCHANT_FOOD_ITEMS_KEY, JSON.stringify(merchantFoodItems));
  }

  public getMerchantFoodItems(): any {
    const merchantFoodItems = window.sessionStorage.getItem(MERCHANT_FOOD_ITEMS_KEY);
    if (merchantFoodItems) {
      return JSON.parse(merchantFoodItems);
    }
    return {};
  }

  public saveFoodItems(foodItems: any): void {
    window.sessionStorage.removeItem(FOOD_ITEMS_KEY);
    window.sessionStorage.setItem(FOOD_ITEMS_KEY, JSON.stringify(foodItems));
  }

  public getFoodItems(): any {
    const foodItems = window.sessionStorage.getItem(FOOD_ITEMS_KEY);
    if (foodItems) {
      return JSON.parse(foodItems);
    }
    return {};
  }

  public saveMerchantListByLocation(merchantList: any): void {
    window.sessionStorage.removeItem(MERCHANT_LIST_BY_LOCATION_KEY);
    window.sessionStorage.setItem(MERCHANT_LIST_BY_LOCATION_KEY, JSON.stringify(merchantList));
  }

  public getMerchantListByLocation(): any {
    const merchantList = window.sessionStorage.getItem(MERCHANT_LIST_BY_LOCATION_KEY);
    if (merchantList) {
      return JSON.parse(merchantList);
    }
    return {};
  }

}
