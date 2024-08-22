import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  email = "admin@gmail.com"
  constructor(private router : Router,private snackBar: MatSnackBar,private service :ApiService) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.service.showSuccess();
  }
  

}
