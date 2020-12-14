import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  regThanks: boolean = false;
  loginErr: boolean = true
  errMsg = ''

  constructor(private authService: AuthService,private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: [this.confirmPasswordValidator("password", "confirmPassword")
    ]
    });
  }


  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  register(form: FormGroup){
    console.log('Valid?', form.valid); // true or false
    console.log('value', form.value);

    this.authService.register(form.value).subscribe((res)=>{
      console.log('register res:',res);
      this.registerForm.reset();
      // alert('sign up successful. please login!')
      this.regThanks = true;
    });
  }

  login(form: FormGroup){
    console.log('Valid?', form.valid); // true or false
    console.log('value', form.value);
    this.errMsg = ''

    this.authService.login(form.value).subscribe((res)=>{
      console.log('login res:',res);
      this.router.navigate(['']);
    },(err)=>{
      // console.log('err:',err.status)
      if(err.status===401){
        this.errMsg = 'Invalid Credentials!'
      }else{
        this.errMsg = 'Something Went Wrong!'
      }
    });
  }

}
