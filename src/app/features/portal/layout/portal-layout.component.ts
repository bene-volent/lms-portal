import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-portal-layout',
  standalone: false,
  
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.css'],

  encapsulation: ViewEncapsulation.None

})
export class PortalLayoutComponent {

  courseSlug: string = 'example-course'; // Replace with actual course slug

  dummyContent:{month:number,weeksContent:{week:number,link:string}[]}[] =  
  [
    {
      month: 1,
      weeksContent: [
        { week: 1, link: `/${this.courseSlug}/1/1` },
        { week: 2, link: `/${this.courseSlug}/1/2` },
        { week: 3, link: `/${this.courseSlug}/1/3` },
        { week: 4, link: `/${this.courseSlug}/1/4` }
      ]
    },
    {
      month: 2,
      weeksContent: [
        { week: 1, link: `/${this.courseSlug}/2/1` },
        { week: 2, link: `/${this.courseSlug}/2/2` },
        { week: 3, link: `/${this.courseSlug}/2/3` },
        { week: 4, link: `/${this.courseSlug}/2/4` }
      ]
    },
    {
      month: 3,
      weeksContent: [
        { week: 1, link: `/${this.courseSlug}/3/1` },
        { week: 2, link: `/${this.courseSlug}/3/2` },
        { week: 3, link: `/${this.courseSlug}/3/3` },
        { week: 4, link: `/${this.courseSlug}/3/4` }
      ]
    },
    {
      month: 4,
      weeksContent: [
        { week: 1, link: `/${this.courseSlug}/4/1` },
        { week: 2, link: `/${this.courseSlug}/4/2` },
        { week: 3, link: `/${this.courseSlug}/4/3` }
      ]
    }
  ]

  constructor(private auth:AuthService){

  }

  get userAsync(){
    return this.auth.currentUser$;
  }

}
