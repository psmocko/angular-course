import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TOASTR_TOKEN, IToastr } from '../common/toastr.service';

@Component({
  templateUrl: 'app/user/profile.component.html',
  styles: [
    `
        em {float:right; color:#E05C65; padding-left:10px;}
        .error input { background-color:#E3C3C5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error :ms-input-placeholder { color: #999; }
    `
  ]
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup;
  private firstName:FormControl;
  private lastName:FormControl;

  constructor(private authService:AuthService, private router:Router, @Inject(TOASTR_TOKEN) private toastr:IToastr){

  }

  ngOnInit(){
    this.firstName = new FormControl(this.authService.currentUser.firstName, 
      [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  saveProfile(formValues){
    if(this.profileForm.valid){
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(()=>{
        this.toastr.success('Profile Saved');
      });
      
      this.router.navigate(['/events']);
    }
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/user/login']);
    });
  }

  validateFirstName(value:string){
    return this.firstName.valid || this.firstName.untouched
  }

  validateLastName(value:string){
    return this.lastName.valid ||this.lastName.untouched
  }

  cancel(){
    this.router.navigate(['events']);
  }
}