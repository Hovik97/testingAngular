import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthService {
  public $userSource = new Subject<any>();
  private url = {
    login: '**********************',
    changeSettingsUser: '**********************',
    me: '**********************'
  };

  constructor(private api: ApiService, private token: TokenStorage, private router: Router) {}

  login(email: string, password: string): Observable <any> {
    return Observable.create(observer => {
      this.api.post(this.url.login, {
        email,
        password
      }).subscribe((data: any) => {
          observer.next({user: data.user});
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
      });
    });
  }

  register(url: string, dataReg: object): Observable <any> {
    return Observable.create(observer => {
      this.api.post(url, dataReg).subscribe((data: any) => {
        observer.next({user: data.user});
        this.token.saveToken(data.token);
        observer.complete();
      });
    });
  }

  changeSettings(changeData: object): Observable <any> {
    return Observable.create(observer => {
      this.api.post(this.url.changeSettingsUser, changeData).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  setUser(user) {
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) {
        this.router.navigate(['/login']);
        return  observer.complete();
      }
      this.api.get(this.url.me).subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        observer.complete();
      });
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }
}
