import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { ConfigService } from '../../services/config.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  encapsulation: ViewEncapsulation.None

})
export class MainLayoutComponent {

  @Input({alias: 'sidebar-required'}) sidebarRequired: boolean = true;

  constructor(private authService: AuthService,private configService : ConfigService) { }

  breadcrumbsSubscriptions: Subscription | null = null;

  ngOnInit(): void {

  }


  hideMenu(){
    this.configService.hideMenu();
  }

  isMenuActive(){
    return this.configService.isMenuActive;
  }
  
  ngOnDestroy(){
    this.breadcrumbsSubscriptions?.unsubscribe();
  }
}
