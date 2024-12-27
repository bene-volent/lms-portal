import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-menubar',
  standalone: false,
  
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
  host:{
    class: 'sidebar',
    '[class.active]':'isActive()'
  }
})
export class MenubarComponent {

  constructor(
    private configService: ConfigService
  ){}

  isActive(){
    return this.configService.isMenuActive
  }

}
