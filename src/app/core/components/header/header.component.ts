import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { ConfigService } from '@core/services/config.service';
import { DomHandler } from 'primeng/dom';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  logo: string = 'https://via.placeholder.com/150'
  @Input({alias:'sidebar-required'}) sidebarRequired: boolean = true;

  scrollListener: VoidFunction | null = null;

  userButtonOptions = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      onClick: () => {
        // console.log('Profile');
      }
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      onClick: () => {
        // console.log('Settings');
      }
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      type: 'link',
      onClick: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  ]

  private window: Window | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private renderer: Renderer2,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router
  ) {
    this.window = this.document.defaultView as Window;
    afterNextRender(() => this.bindScrollListener());

    if (this.authService.getUserRole() !== 'user') {

      // already in admin
      if (this.router.url.includes('admin')) {
        this.userButtonOptions.unshift({
          label: 'User Portal',
          icon: 'pi pi-user-minus',
          type: 'link',
          onClick: () => {
            this.router.navigate(['/']);
          }
        })
      } else {

        this.userButtonOptions.unshift({
          label: 'Admin',
          icon: 'pi pi-user-plus',
          type: 'link',
          onClick: () => {
            this.router.navigate(['/admin']);
          }
        })
      }
    }
  }

  getName(){
    return this.configService.logoName
  }

  bindScrollListener() {
    if (!this.scrollListener) {
      this.scrollListener = this.renderer.listen(this.window, 'scroll', () => {
        if (this.window!.scrollY > 0) {
          this.el.nativeElement.children[0].classList.add('header-sticky');
        } else {
          this.el.nativeElement.children[0].classList.remove('header-sticky');
        }
      });
    }
  }

  unbindScrollListener() {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
  }

  toggleMenu() {
    if (this.configService.isMenuActive) {
      this.configService.hideMenu();
      DomHandler.unblockBodyScroll('blocked-scroll')
    }
    else {
      this.configService.showMenu();
      DomHandler.blockBodyScroll('blocked-scroll')
    }
  }

  get user() {
    return this.authService.getCurrentUser();
  }

  ngOnDestroy() {
    this.unbindScrollListener();
  }






}
