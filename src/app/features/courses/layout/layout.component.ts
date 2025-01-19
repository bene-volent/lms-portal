import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { CourseService } from '../../../core/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None

})
export class LayoutComponent {

    course:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    loading: boolean = false;
    error: string|null = null;
    courseSlug: string = '';
    constructor(private auth:AuthService, private courseService:CourseService, private route:ActivatedRoute){
      // all the above course data will be recived from a course service
      // which will extract the data from the api and provide it to the component
  
    }
    ngOnInit(){
      this.route.params.subscribe(params=>{
        this.courseSlug = params['course-id'];
        this.courseService.getCourseFromApi(this.courseSlug);
        this.courseService.getUserCourseProgressFromApi();      
      })
    }
  
    getModules(){
      return this.courseService.getModules()
    }
    get userAsync(){
      return this.auth.currentUser$;
    }
  
}
