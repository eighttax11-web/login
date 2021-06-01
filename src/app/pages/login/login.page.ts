import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  response: Response[] = [];

  constructor(private _userService: UserService,
              private router: Router,
              private storage: StorageService,
              public loadingController: LoadingController ) { }

  ngOnInit() {
  }

  login(form: NgForm) {

    this.presentLoading();

    this._userService.login(this.user).subscribe(
      (resp: any) => {

        this.response = resp
        
        if (this.response.length > 0) {
          
          this.storage.saveUser(this.response);
          this.router.navigateByUrl('home');
          console.log(this.response);

        } else {
          console.log('Invalid login');
        }
      }
    )
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}