import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarRoutingModule } from './side-bar-routing.module';
import { SideBarComponent } from './side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    SideBarRoutingModule
  ],
  declarations: [SideBarComponent],
  exports: [SideBarComponent]
})
export class SideBarModule { }
