import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Global {
  public authenticationUser;
  public loader = false;
}

