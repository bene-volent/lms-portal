import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { RouteData } from '@core/models';

export interface Breadcrumb {
    label: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
    public readonly breadcrumbs$ = this.breadcrumbs.asObservable();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            distinctUntilChanged(),
        ).subscribe(() => {
            const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);

            // remove any breadcrumbs where the adjacent breadcrumb has same url
            for (let i = 0; i < breadcrumbs.length - 1; i++) {
                if (breadcrumbs[i].url === breadcrumbs[i + 1].url) {
                    breadcrumbs.splice(i, 1);
                    i--;
                }
            }
            
            // console.log(breadcrumbs.map(b => b.label));
            this.breadcrumbs.next(breadcrumbs);
        });
    }

    private createBreadcrumbs(
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: Breadcrumb[] = []
    ): Breadcrumb[] {
        const children = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL: string = child.snapshot.url
                .map(segment => segment.path)
                .join('/');

            const nextUrl = routeURL ? `${url}/${routeURL}` : url;

            const routeData = child.snapshot.data as RouteData;
            
            if (routeData?.breadcrumb) {
                const label = this.getBreadcrumbLabel(routeData, child.snapshot.paramMap);
                breadcrumbs.push({
                    label,
                    url: nextUrl || '/'
                });
            }

            return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
        }

        return breadcrumbs;
    }

    private getBreadcrumbLabel(routeData: RouteData, paramMap: ParamMap): string {
        if (!routeData.breadcrumb) {
            return '';
        }

        let label = routeData.breadcrumb;

        // Handle dynamic parameters
        if (routeData.key && paramMap.has(routeData.key)) {
            const paramValue = paramMap.get(routeData.key);

            // if param value is a string, capitalize the first letter
            if (typeof paramValue === 'string') {
                label = `${label}: ${paramValue.charAt(0).toUpperCase() + paramValue.slice(1)}`;
            }

            // param is an integer
            if (typeof paramValue === 'number') {
                label = `${label}: ${paramValue}`;
            }
            
            
        } else if (routeData.slug && paramMap.has('slug')) {
            const slugValue = paramMap.get('slug');
            label = `${label}: ${slugValue}`;
        }

        return label;
    }
}