import { Component, ViewEncapsulation } from '@angular/core';
import { Breadcrumb, BreadcrumbService } from '../../services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {

  subscription: Subscription | null = null;
  

  constructor(private BreadcrumbService: BreadcrumbService) { }
  getBreadcrumbs(){
    return this.BreadcrumbService.breadcrumbs$;
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
}
