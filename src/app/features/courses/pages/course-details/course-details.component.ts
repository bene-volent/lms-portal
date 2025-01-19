import { Component } from '@angular/core';
import { ToastService } from '@core/services/toast.service';
import { CourseService } from '../../../../core/services/course.service';

@Component({
  selector: 'app-course-details',
  standalone: false,
  
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  modalVisible = false;

  continue = true
  courseDetails: any
  userCourseProgress: any

  moduleSelected = {
    slug: '',
    title: '',
    lessonsCovered: 0,
    totalLessons: 0,
    quizzesCovered: 0,
    totalQuizzes: 0,
    lessonsCompleted: 0,
    quizzesCompleted: 0,
    quizzesAverageAccuracy: 0,
    quizzesAverageTimeSpent: 0
  };

  constructor(private toastService: ToastService,private courseService:CourseService) {}

  ngOnInit() {
    this.courseDetails = this.courseService.getCourse()
    this.userCourseProgress = this.courseService.getUserCourseProgress()
  }

  openModuleDetails(moduleSlug: string){
    console.log(moduleSlug)
    const selectedModule = this.userCourseProgress.modulesProgress.find((module: { moduleSlug: 'string'; }) => module.moduleSlug === moduleSlug)
    this.moduleSelected = {
      slug: moduleSlug,
      title: selectedModule.title,
      lessonsCovered: selectedModule.lessonsCompleted,
      totalLessons: selectedModule.totalLessons,
      quizzesCovered: selectedModule.lessonsCompleted,
      totalQuizzes: selectedModule.totalQuizzes,
      lessonsCompleted: this.userCourseProgress.lessonsCompleted,
      quizzesCompleted: selectedModule.quizzesCompleted,
      quizzesAverageAccuracy: this.userCourseProgress.overallTestSummary.testsAverageAccuracy,
      quizzesAverageTimeSpent: this.userCourseProgress.overallTestSummary.testsTimeSpent
    }
    console.log(this.moduleSelected)
    this.modalVisible = true
  }
}
