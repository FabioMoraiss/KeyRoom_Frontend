import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  constructor(private router: Router, private http: HttpClient) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

   submit() {
    if (this.form.invalid) return;

    const payload = {
      login: this.form.value.uname,
      password: this.form.value.password,
    };

    this.http.post('http://localhost:8081/auth/login', payload, { responseType: 'text' })
      .subscribe({
        next: (jwt: string) => {
          localStorage.setItem('jwt', jwt);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Login inválido');
        }
      });
  }
}
