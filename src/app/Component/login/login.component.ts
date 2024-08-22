import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  constructor(private router : Router, private userService : ApiService,private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.createForm(); 
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }
  
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  createForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  }

  

  login(){
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched(); 
      return;    
    }

    if (this.loginForm.valid){
      this.userService.login(this.loginForm.value).subscribe(
        (result:any) => {
          console.log(result);
          this.router.navigate(['/home']);
          this.userService.showLogSuccess()
        },
      );
    }
  }

}
