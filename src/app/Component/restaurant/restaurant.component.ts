import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  restaurants: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false; 
  currentRestaurantId: number | null = null; 
  addFormBtn : boolean = false;
  updateFormBtn : boolean = false;
  imageShow : boolean = false;
  searchTerm: string = '';
  filteredRestaurants: any[] = [];

  constructor(private fb: FormBuilder, private restaurantService: ApiService) {}

  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      id: [null], 
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      location: ['', Validators.required],
      description: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerContact: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      image: [null, Validators.required]
    });
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.filteredRestaurants = this.restaurantService.getRestaurants();
    this.restaurants = [...this.filteredRestaurants]; 
      this.imageShow = this.restaurants.length > 0;
    if(this.restaurants.length > 0){
       this.imageShow = true;
    }else{
      this.imageShow = false;
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.restaurantForm.get(field);
    const isInvalid = control?.invalid ?? false;
    const isTouchedOrDirty = (control?.touched ?? false);
    return isInvalid && isTouchedOrDirty;
  }

 
 

 

  toggleForm() {
    this.showForm = !this.showForm;
    this.addFormBtn = true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.restaurantForm.patchValue({
        image: e.target.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.restaurantForm.valid) {
      const restaurant = this.restaurantForm.value;
      if (this.editMode) {
        this.restaurantService.updateRestaurant(restaurant);
        this.restaurantService.showUpdateSuccess();
      } else {
        this.restaurantService.addRestaurant(restaurant);
        this.restaurantService.showAddSuccess();
      }
      this.loadRestaurants();
      this.showForm = false;
      this.restaurantForm.reset();
      this.editMode = false; 
      this.currentRestaurantId = null;
    }else{
      this.restaurantForm.markAllAsTouched();
      this.restaurantService.showErrorMessage();
    }
  }

  filterRestaurants() {
    if (this.searchTerm) {
      this.restaurants = this.filteredRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.restaurants = [...this.filteredRestaurants];
    }
  }

 

  editRestaurant(restaurant: any) {
    this.restaurantForm.patchValue({
      id: restaurant.id,
      name: restaurant.name,
      number: restaurant.number,
      email: restaurant.email,
      location: restaurant.location,
      description: restaurant.description,
      ownerName: restaurant.ownerName,
      ownerContact: restaurant.ownerContact,
      image: restaurant.image
    });
    this.showForm = true;
    this.editMode = true;
    this.currentRestaurantId = restaurant.id;
    this.updateFormBtn = true;
    this.addFormBtn = false;
  }

  deleteRestaurant(restaurant: any) {
    this.restaurantService.deleteRestaurant(restaurant);
    this.loadRestaurants();
    this.restaurantService.showDeleteSuccess();
  }

  backToList(){
    this.showForm = false;
    this.restaurantForm.reset();
    this.updateFormBtn = false;
    this.addFormBtn = false;
  }
}
