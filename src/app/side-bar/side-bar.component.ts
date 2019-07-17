import { Component, Input, OnInit } from '@angular/core';
import { Global } from '../global/globals';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() sidebarMenu;
  constructor(public global: Global) { }

  ngOnInit() {
  }

}
