import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { last, map } from 'rxjs';


interface Lesson{
  title: string;
  slug: string;
  contentLink: string;
  type: string;
  completed: boolean;
}

interface Quiz{
  title: string;
  slug: string;
  contentLink: string;
  completed: boolean;
}

interface Module{
  title: string;
  slug: string;
  lessons: Lesson[];
  quizzes: Quiz[];

}

interface Course{
  title: string;
  courseID: string;
  slug: string;
  modules: Module[];
  totalModules: number;
  lessonsCovered: number;
  quizzesCovered: number;
}

interface ModuleTestSummary{
  moduleSlug: string;
  tests: {
    testSlug: string;
    score: number;
    completed: boolean;
    accuracy: number;
    attempts: number;
    timeSpent: number;
    maxTime: number;
  }[];
}


interface ModuleProgress{
  moduleSlug: string;
  title: string;
  lessonsCompleted: number;
  quizzesCompleted: number;
  totalLessons: number;
  totalQuizzes: number;
}

interface OverallTestSummary{
  testsTaken: number;
  testsCompleted: number;
  testsAverageAccuracy: number;
  testsTimeSpent: number;
}

interface UserCourseInfo{
  lessonsCompleted: number;
  quizzesCompleted: number;
  moduleTestSummaries: ModuleTestSummary[];
  lastContent: string;
  lastLesson: {
    moduleSlug: string;
    lessonSlug: string;
  };
  lastQuiz: {
    moduleSlug: string;
    quizSlug: string;
  };
  modulesProgress: ModuleProgress[];
  overallTestSummary: OverallTestSummary;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private auth: AuthService) { }

  currentCourse: any;
  userCourseInfo: any;
  getCourseFromApi(slug: string) {
    // Call the API to get the course

    // Set the course

    // Return the course


    // This is just a dummy implementation
    this.currentCourse =  {
      title: 'Example Course',
      courseID: 'exp-123',
      slug: slug,
      modules: [
        {
          title: 'Module 1',
          slug: 'module-1',
          lessons: [
            {
              title: 'Lesson 1',
              slug: 'lesson-1',
              contentLink: 'api/courses/example-course/module-1/lesson-1',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 2',
              slug: 'lesson-2',
              contentLink: 'api/courses/example-course/module-1/lesson-2',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 3',
              slug: 'lesson-3',
              contentLink: 'api/courses/example-course/module-1/lesson-3',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 4',
              slug: 'lesson-4',
              contentLink: 'api/courses/example-course/module-1/lesson-4',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 5',
              slug: 'lesson-5',
              contentLink: 'api/courses/example-course/module-1/lesson-5',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 6',
              slug: 'lesson-6',
              contentLink: 'api/courses/example-course/module-1/lesson-6',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 7',
              slug: 'lesson-7',
              contentLink: 'api/courses/example-course/module-1/lesson-7',
              type: 'reading',
              completed: false
            }
          ],
          quizzes: [
            {
              title: 'Quiz 1',
              slug: 'quiz-1',
              contentLink: 'api/courses/example-course/module-1/quiz-1',
              completed: false
            },
            {
              title: 'Quiz 2',
              slug: 'quiz-2',
              contentLink: 'api/courses/example-course/module-1/quiz-2',
              completed: false
            }
          ]
        },
        {
          title: 'Module 2',
          slug: 'module-2',
          lessons: [
            {
              title: 'Lesson 1',
              slug: 'lesson-1',
              contentLink: 'api/courses/example-course/module-2/lesson-1',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 2',
              slug: 'lesson-2',
              contentLink: 'api/courses/example-course/module-2/lesson-2',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 3',
              slug: 'lesson-3',
              contentLink: 'api/courses/example-course/module-2/lesson-3',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 4',
              slug: 'lesson-4',
              contentLink: 'api/courses/example-course/module-2/lesson-4',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 5',
              slug: 'lesson-5',
              contentLink: 'api/courses/example-course/module-2/lesson-5',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 6',
              slug: 'lesson-6',
              contentLink: 'api/courses/example-course/module-2/lesson-6',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 7',
              slug: 'lesson-7',
              contentLink: 'api/courses/example-course/module-2/lesson-7',
              type: 'reading',
              completed: false
            }
          ],
          quizzes: [
            {
              title: 'Quiz 1',
              slug: 'quiz-1',
              contentLink: 'api/courses/example-course/module-2/quiz-1',
              completed: false
            },
            {
              title: 'Quiz 2',
              slug: 'quiz-2',
              contentLink: 'api/courses/example-course/module-2/quiz-2',
              completed: false
            }
          ]
        },
        {
          title: 'Module 3',
          slug: 'module-3',
          lessons: [
            {
              title: 'Lesson 1',
              slug: 'lesson-1',
              contentLink: 'api/courses/example-course/module-3/lesson-1',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 2',
              slug: 'lesson-2',
              contentLink: 'api/courses/example-course/module-3/lesson-2',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 3',
              slug: 'lesson-3',
              contentLink: 'api/courses/example-course/module-3/lesson-3',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 4',
              slug: 'lesson-4',
              contentLink: 'api/courses/example-course/module-3/lesson-4',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 5',
              slug: 'lesson-5',
              contentLink: 'api/courses/example-course/module-3/lesson-5',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 6',
              slug: 'lesson-6',
              contentLink: 'api/courses/example-course/module-3/lesson-6',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 7',
              slug: 'lesson-7',
              contentLink: 'api/courses/example-course/module-3/lesson-7',
              type: 'reading',
              completed: false
            }
          ],
          quizzes: [
            {
              title: 'Quiz 1',
              slug: 'quiz-1',
              contentLink: 'api/courses/example-course/module-3/quiz-1',
              completed: false
            },
            {
              title: 'Quiz 2',
              slug: 'quiz-2',
              contentLink: 'api/courses/example-course/module-3/quiz-2',
              completed: false
            }
          ]
        },
        {
          title: 'Module 4',
          slug: 'module-4',
          lessons: [
            {
              title: 'Lesson 1',
              slug: 'lesson-1',
              contentLink: 'api/courses/example-course/module-4/lesson-1',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 2',
              slug: 'lesson-2',
              contentLink: 'api/courses/example-course/module-4/lesson-2',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 3',
              slug: 'lesson-3',
              contentLink: 'api/courses/example-course/module-4/lesson-3',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 4',
              slug: 'lesson-4',
              contentLink: 'api/courses/example-course/module-4/lesson-4',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 5',
              slug: 'lesson-5',
              contentLink: 'api/courses/example-course/module-4/lesson-5',
              type: 'reading',
              completed: false
            },
            {
              title: 'Lesson 6',
              slug: 'lesson-6',
              contentLink: 'api/courses/example-course/module-4/lesson-6',
              type: 'video',
              completed: false
            },
            {
              title: 'Lesson 7',
              slug: 'lesson-7',
              contentLink: 'api/courses/example-course/module-4/lesson-7',
              type: 'reading',
              completed: false
            }
          ],
          quizzes: [
            {
              title: 'Quiz 1',
              slug: 'quiz-1',
              contentLink: 'api/courses/example-course/module-4/quiz-1',
              completed: false
            },
            {
              title: 'Quiz 2',
              slug: 'quiz-2',
              contentLink: 'api/courses/example-course/module-4/quiz-2',
              completed: false
            }
          ]
        }
      ],
          
      totalModules: 4,
      lessonsCovered: 0,
      quizzesCovered: 0,


    }

    return this.currentCourse;
  }

  getModules(){
    return this.currentCourse.modules.map((module: { title: any; slug: any; })=>({title: module.title, slug: module.slug}));
  }

  getUserCourseProgressFromApi() {
    // Call the API to get the user's course progress from auth service's help

    // Return the progress

    // This is just a dummy implementation
    return this.userCourseInfo = {
      lessonsCompleted: 0,
      quizzesCompleted: 0,
      moduleTestSummaries: [
        {
          moduleSlug: 'module-1',
          tests: [
            { testSlug: 'quiz-1', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 },
            { testSlug: 'quiz-2', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 }
          ]
        },
        {
          moduleSlug: 'module-2',
          tests: [
            { testSlug: 'quiz-1', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 },
            { testSlug: 'quiz-2', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 }
          ]
        },
        {
          moduleSlug: 'module-3',
          tests: [
            { testSlug: 'quiz-1', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 },
            { testSlug: 'quiz-2', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 }
          ]
        },
        {
          moduleSlug: 'module-4',
          tests: [
            { testSlug: 'quiz-1', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 },
            { testSlug: 'quiz-2', score: 0, completed: false, accuracy: 0, attempts: 0, timeSpent:0,maxTime:3600 }
          ]
        }
      ],
      lastContent: 'lesson',
      lastLesson: {
        moduleSlug: 'module-1',
        lessonSlug: 'lesson-1'
      },
      lastQuiz: {
        moduleSlug: 'module-1',
        quizSlug: 'quiz-1'
      },
      modulesProgress:[
        {moduleSlug: 'module-1',title: 'Module 1',lessonsCompleted: 0, quizzesCompleted: 0,totalLessons:7,totalQuizzes:2},
        {moduleSlug: 'module-2',title: 'Module 2', lessonsCompleted: 0, quizzesCompleted: 0,totalLessons:7,totalQuizzes:2},
        {moduleSlug: 'module-3',title: 'Module 3', lessonsCompleted: 0, quizzesCompleted: 0,totalLessons:7,totalQuizzes:2},
        {moduleSlug: 'module-4', title: 'Module 4',lessonsCompleted: 0, quizzesCompleted: 0,totalLessons:7,totalQuizzes:2},
      ],
      overallTestSummary: {
        testsTaken:0,
        testsCompleted:0,
        testsAverageAccuracy:0,
        testsTimeSpent:0,
      }
    }
  }

  getCourse() {
    return this.currentCourse;
  }

  getUserCourseProgress() {
    return this.userCourseInfo;
  }
  
}
