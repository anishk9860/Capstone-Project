import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private selectedMerchant !: any;

  private saveCustomerLocationURL = "http://localhost:8080/api/save-customer-location";

  private saveItemToCartURL = "http://localhost:8080/api/save-item-to-cart";

  private getItemsFromCartURL = "http://localhost:8080/api/get-items-from-cart";

  private updateItemsInCartURL = "http://localhost:8080/api/update-items-in-cart";

  private postTransactiontURL = "http://localhost:8080/api/post-transaction";

  private httpOptions = {
    headers: new HttpHeaders()
  }

  constructor(private httpClient: HttpClient) { }

  saveCustomerDetails(customerDetails: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.saveCustomerLocationURL}`, customerDetails, 
      this.httpOptions);
  }

  postTransaction(orderDetails: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.postTransactiontURL}`, orderDetails, 
      this.httpOptions);
  }

  saveItemToCart(foodItem: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.saveItemToCartURL}`, foodItem, 
      this.httpOptions);
  }

  updateItemsInCart(updatedItem: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.updateItemsInCartURL}`, updatedItem, 
      this.httpOptions);
  }

  getCartItems(userId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.getItemsFromCartURL}`, userId, 
      this.httpOptions);
  }

  setSelectedMerchant(merchant: any){
    this.selectedMerchant = merchant;
  }

  getSelectedMerchant(){
    return this.selectedMerchant;
  }

}
