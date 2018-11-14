import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErr: boolean;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthServiceService,
    private _router: Router) {
    this.loginErr = false;
  }

  ngOnInit() {
    this.setForm();
  }
  setForm() {
    this.loginForm = this._formBuilder.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }
  onLogin({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.loginErr = false;
      this._authService.setToken(value.Username);
      this._router.navigate(['contact-list']);
    } else {
      this.loginErr = true;
    }
  }

}
