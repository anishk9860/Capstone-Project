import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private selectedMerchant !: any;

  private selectedFilter : string = 'All';

  private saveCustomerLocationURL = "http://localhost:8080/api/save-customer-location";

  private saveItemToCartURL = "http://localhost:8080/api/save-item-to-cart";

  private getItemsFromCartURL = "http://localhost:8080/api/get-items-from-cart";

  private updateItemsInCartURL = "http://localhost:8080/api/update-items-in-cart";

  private postTransactiontURL = "http://localhost:8080/api/post-transaction";

  private getCustomerTransactionsURL = "http://localhost:8080/api/get-customer-transactions";

  private updateAddressDetailsURL = "http://localhost:8080/api/update-address-details";

  private updateEmailURL = "http://localhost:8080/api/update-customer-email";

  private updatePasswordURL = "http://localhost:8080/api/update-customer-password";

  private httpOptions = {
    headers: new HttpHeaders()
  }

  private searchedText !: string;

  constructor(private httpClient: HttpClient) { }

  saveCustomerDetails(customerDetails: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.saveCustomerLocationURL}`, customerDetails, 
      this.httpOptions);
  }

  updateCustomerAddress(customerUpdateAddressDetails : Object): Observable<any> {
    return this.httpClient.post<any>(`${this.updateAddressDetailsURL}`, customerUpdateAddressDetails, 
    this.httpOptions);
  }

  updateCustomerEmail(updateEmailDetails : Object): Observable<any> {
    return this.httpClient.post<any>(`${this.updateEmailURL}`, updateEmailDetails, 
    this.httpOptions);
  }

  updateCustomerPassword(updatePasswordDetails : Object): Observable<any> {
    return this.httpClient.post<any>(`${this.updatePasswordURL}`, updatePasswordDetails, 
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

  setSelectedFilter(selectedFilter:string) {
    this.selectedFilter = selectedFilter;
  }

  getSelectedFilter() {
    return this.selectedFilter;
  }

  setSearchedText(searchedText:string) {
    this.searchedText = searchedText;
  }

  getSearchedText(): any{
    return this.searchedText;
  }

  getAllCustomerTransactions(customerId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.getCustomerTransactionsURL}`, customerId, 
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
