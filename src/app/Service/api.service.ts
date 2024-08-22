import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Restaurant {
  id: number; // Add an ID for each restaurant
  name: string;
  number: string;
  email: string;
  location: string;
  description: string;
  ownerName: string;
  ownerContact: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private storageKey = 'restaurants';

  constructor(private snackBar: MatSnackBar) {}

  getRestaurants(): Restaurant[] {
    const restaurants = localStorage.getItem(this.storageKey);
    return restaurants ? JSON.parse(restaurants) : [];
  }

  addRestaurant(restaurant: Restaurant) {
    const restaurants = this.getRestaurants();
    // Generate a unique ID for the new restaurant
    restaurant.id = new Date().getTime(); // Simple unique ID
    restaurants.push(restaurant);
    this.saveRestaurants(restaurants);
  }

  updateRestaurant(updatedRestaurant: Restaurant) {
    let restaurants = this.getRestaurants();
    restaurants = restaurants.map((restaurant) =>
      restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
    );
    this.saveRestaurants(restaurants);
  }

  deleteRestaurant(restaurant: Restaurant) {
    let restaurants = this.getRestaurants();
    restaurants = restaurants.filter((r) => r.id !== restaurant.id);
    this.saveRestaurants(restaurants);
  }

  private saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(restaurants));
  }

  login({ username, password }: any): Observable<any> {
    console.log(123);
    console.log(username);
    if (username === 'Superadmin' && password === 'admin@123') {
      localStorage.setItem('token', 'Superadmin');
      return of({ adminname:'Superadmin'});
    }
    else{
       return throwError(new Error('Failed to login'));
    }
   
  } 
  
  
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  showAddSuccess() {
    this.snackBar.open('Restaurant Added Successfully!', 'X', {
      duration: 3000, 
      verticalPosition: 'top', 
      horizontalPosition: 'right',
      panelClass: ['success-snackbar'] 
    });
  }

  showUpdateSuccess(){
    this.snackBar.open('Restaurant Updated Successfully!', 'X', {
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'right',
      panelClass: ['success-snackbar']
    });
  }

  showErrorMessage(){
    this.snackBar.open('Please Enter Required Fields', 'X', {
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'right',
      // panelClass: ['error-snackbar']
    });
  }

   
  showDeleteSuccess(){
    this.snackBar.open('Restaurant Deleted Successfully!', 'X', {
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'right',
      panelClass: ['success-snackbar']
    });
  }

  showLogSuccess() {
    this.snackBar.open('Logged In Successfully!', 'X', {
      duration: 3000, 
      verticalPosition: 'top', 
      horizontalPosition: 'right',
      panelClass: ['success-snackbar'] 
    });
  }

  showSuccess() {
    this.snackBar.open('Logged Out Successfully', 'X', {
      duration: 3000, 
      verticalPosition: 'top', 
      horizontalPosition: 'right',
      panelClass: ['success-snackbar'] 
    });
  }
 
}
