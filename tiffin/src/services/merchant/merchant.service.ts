import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private editFoodItemDetails !: any;

  private saveLocationURL = "http://localhost:8080/api/save-location";
  private addFoodItemURL = "http://localhost:8080/api/add-fooditem";
  private deleteFoodItemURL = "http://localhost:8080/api/delete-fooditem";
  private editFoodItemURL = "http://localhost:8080/api/edit-fooditem";
  private getMerchantTransactionsURL = "http://localhost:8080/api/get-merchant-transactions";
  private updateOrderStatusURL = "http://localhost:8080/api/update-order-status";

  private httpOptions = {
    headers: new HttpHeaders()
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  saveDetails(formData:FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.saveLocationURL}`, formData, 
      this.httpOptions);
  }

  saveFoodItemDetails(formData:FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.addFoodItemURL}`, formData, 
      this.httpOptions);
  }

  deleteFoodItem(itemId:number): Observable<any> {
    return this.httpClient.post<any>(`${this.deleteFoodItemURL}`, itemId, 
      this.httpOptions);
  }

  editFoodItem(foodItemDetails:Object): Observable<any> {
    return this.httpClient.post<any>(`${this.editFoodItemURL}`, foodItemDetails, 
      this.httpOptions);
  }

  setEditFoodItemDetails(editFoodItemDetails:any) {
    this.editFoodItemDetails = editFoodItemDetails;
  }

  getEditFoodItemDetails(): any{
    return this.editFoodItemDetails;
  }

  getAllMerchantTransactions(merchantId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.getMerchantTransactionsURL}`, merchantId, 
    this.httpOptions);
  }

  updateOrderStatus(changeStatusRequest: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.updateOrderStatusURL}`, changeStatusRequest, 
    this.httpOptions);
  }

  createImageFromBlob(blobString: string): any{
    const byteString = window.atob(blobString);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    var int8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
  }
    const blob = new Blob([int8Array], {type:'image/jpg'});
    return URL.createObjectURL(blob);
  }

}
