import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private authService : AuthService, private router :  Router){}
  public onLogin():void{
    this.authService.login('fernando@gmail.com', 'axsasasasa.asaasassasasa.asasasasa')
    .subscribe(
      user =>{
        this.router.navigate(['/'])
      }
    )
  }

}
