import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SignupLoginService } from 'src/app/services/signup-login.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css'],
})
export class SignupLoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  list: {};

  constructor(
    private signupLoginService: SignupLoginService,
    public userdata: UserdataService,
    private messageService: MessageService,
    private rout: Router
  ) {}

  ngOnInit(): void {
    this.signupLoginService.role().then(res => {
      this.list = res.data;
      // console.log(this.list);
    })

    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })

    this.signupForm = new FormGroup({
      email:new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      roleId: new FormControl(4,Validators.required),
    })

  }

  login(){
    if(this.loginForm.valid){
      this.signupLoginService.login(this.loginForm.value).subscribe(res => {
        if(res.status == 200){
          this.userdata.user = res.data;
          console.log(this.userdata);

          if(res.data.roleId == 2){
            console.log("Admin");
            this.messageService.add({severity:'success', summary: 'Success', detail:'Admin Successfully!!'});
            this.rout.navigateByUrl('/dashboard')
          }
          else if(res.data.roleId == 3){
            
            console.log("Doctor");
            this.messageService.add({severity:'success', summary: 'Success', detail:'Doctor Successfully!!'});
            this.rout.navigateByUrl('/doctor')
          }
          else if(res.data.roleId == 4){
            console.log("Patient");
            this.messageService.add({severity:'success', summary: 'Success', detail:'Patient Successfully!!'});
            console.log(res.data);

          }
          else if(res.data.roleId == 5){
            console.log("Pharmacy");
            this.messageService.add({severity:'success', summary: 'Success', detail:'Pharmacy Successfully!!'});

          }
          else if(res.data.roleId == 6){
            console.log("Pathology");
            this.messageService.add({severity:'success', summary: 'Success', detail:'Pathology Successfully!!'});
          }
        }
        else{
          console.log(res);
          this.messageService.add({severity:'error', summary: 'Error', detail:'User Not Found!!'});
        }
      })
    }
    else{
      this.messageService.add({severity:'info', summary: 'Info', detail: 'Please Enter Credentials!!'});
    }
  }

  signup(){
    if(this.signupForm.valid){
      this.signupLoginService.signup(this.signupForm.value).subscribe(res => {
        if(res.status == 200){
          this.messageService.add({severity:'success', summary: 'Success', detail:'Successfully Signup!!'});
          console.log(res);
          this.rout.navigateByUrl('signup-login');
        }
        else{
          console.log(res);
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'You have already registered!!'});
        }
      })
    }
    else{
      this.messageService.add({severity:'info', summary: 'Info', detail: 'Please Enter All Fields!!'});
    }
  }
}
