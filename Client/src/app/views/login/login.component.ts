import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm : FormGroup;
  loading = false;
  submitted = false;
  returnUrl : string = '';
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService : AuthenticationService,
    private router : Router,
    ) 
  {

  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  } 

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe((result) => {
        if (result.isSuccess == true) {
          this.error = '';
          this.router.navigate(['']);
        }
        else {
          if (result.errorCode == "1") {
            alert("Không thành công, vui lòng kiểm tra kết nối đến server và thử lại.");
          }
          
          this.loading = false;
          this.error = result.errorMessage;
        }
      },
      (error) => {
        this.error = error["message"];
        this.loading = false;
        alert("Không thành công, vui lòng kiểm tra kết nối đến server và thử lại.");
      }, () => {
        this.loading = false;
      });

  }

  ngOnDestroy(): void {
    
  }
}
