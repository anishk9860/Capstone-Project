import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItemCount : number = 0;
  cartItems: any = [];
  totalCost = 0;
  selectedQuantity !: number;

  constructor(private router: Router, private customerService: CustomerService, 
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    const items = this.tokenStorage.getFoodItems();
    console.log(items);
    let totalItems : number = 0;
    let userId = this.tokenStorage.getUser().id;
    this.customerService
      .getCartItems(userId)
      .subscribe((res:any) => {
        console.log(res);
        if(res.length === 0){
          return;
        } else {
          for(let i=0; i<res.length; i++){
            for(let j=0; j<items.length; j++){
              if(items[j].itemId === res[i].itemId){
                this.cartItems.push({
                  itemId : items[j].itemId,
                  itemName: items[j].itemName,
                  itemCount : res[i].itemCount,
                  itemCost : items[j].itemCost * res[i].itemCount
                })
                this.totalCost += items[j].itemCost * res[i].itemCount;
              }
            }
            totalItems = totalItems + res[i].itemCount;
          }
          this.cartItemCount = totalItems;
          console.log(this.cartItemCount);
          console.log(this.cartItems);
        }
        
      })
    }

    goToCustomerHome(){
      this.router.navigate(['customer-home']);
    }

    goToOrderDetails(){
      this.router.navigate(['order-details']);
    }

    quantitySelected(item: any){
      console.log(item);
      if(item.itemCount === this.selectedQuantity){
        return;
      } else {
        const updatedItem = {
          itemId : item.itemId,
          itemCost : (item.itemCost/item.itemCount),
          itemName : item.itemName,
          itemCount : this.selectedQuantity,
          customerId : this.tokenStorage.getUser().id,
        }
        console.log(updatedItem);
        console.log(this.selectedQuantity);
        const items = this.tokenStorage.getFoodItems();
        this.customerService
          .updateItemsInCart(updatedItem)
          .subscribe((res: any) => {
            window.location.reload();
          })
      }
      
    }

  }



