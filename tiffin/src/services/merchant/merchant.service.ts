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

  private httpOptions = {
    headers: new HttpHeaders()
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  // saveDetails(merchantDetails: Object): Observable<any> {
  //   return this.httpClient.post<any>(`${this.saveLocationURL}`, merchantDetails, 
  //     this.httpOptions);
  // }

  saveDetails(formData:FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.saveLocationURL}`, formData, 
      this.httpOptions);
  }

  // saveFoodItemDetails(foodItemDetails:Object): Observable<any> {
  //   return this.httpClient.post<any>(`${this.addFoodItemURL}`, foodItemDetails, 
  //     this.httpOptions);
  // }

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

  createImageFromBlob(blobString: string): any{
    const byteString = window.atob(blobString);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    // var bytes = new Uint8Array(blobString.length / 2);
    // var bytes = new Uint8Array(blobString.length);
    var int8Array = new Uint8Array(arrayBuffer);

    // for (var i = 0; i < blobString.length; i += 2) {
    //     bytes[i / 2] = parseInt(blobString.substring(i, i + 2), /* base = */ 16);
    // }

    for (var i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
  }

    // Make a Blob from the bytes
    // var blob = new Blob([bytes], {type: 'image/jpg'});
    const blob = new Blob([int8Array], {type:'image/jpg'});

    // Use createObjectURL to make a URL for the blob
    var image = new Image();
    return URL.createObjectURL(blob);
  }

}
