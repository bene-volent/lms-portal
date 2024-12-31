import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification, NotificationResponse } from '@core/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private backendURL = 'http://localhost:3000/';

  notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();

  constructor(private auth: AuthService, private httpClient: HttpClient) { 

  }

  getNotifications(count: number = 5) {
    // Url = /api/notifications/{userId}?count={count}
    // Method = GET
    // Headers: Authorization: Bearer {token}
    // Response: {count: number, notifications: Notification[]}




    // Actual API call
    // if (this.auth.isAuthenticated()) {
    //   return this.httpClient.get<NotificationResponse>(this.backendURL + 'api/notifications/' + this.auth.userID+`?count=${count}`).pipe(
    //     take(1),
    //     map((response) => {
    //       this.notifications.next(response.notifications);
    //     }))
    // }
    // else {
    //   this.notifications.next([]);
    // }


    // Replace the below with actual API call
    let dummyNotifications: Notification[] = [
      {
        id: '1',
        notificationTitle: 'Welcome to LMS',
        message: 'Welcome to Learning Management System',
        time: '2021-08-01T12:00:00Z',
        isRead: false
      },
      {
        id: '2',
        notificationTitle: 'New Course',
        message: 'A new course has been added to the platform',
        time: '2021-08-01T12:00:00Z',
        isRead: false
      },
      {
        id: '2',
        notificationTitle: 'New Course',
        message: 'A new course has been added to the platform',
        time: '2021-08-01T12:00:00Z',
        isRead: true
      },
      // Add more dummy notifications here
      {
        id: '3',
        notificationTitle: 'Maintenance Downtime',
        message: 'The system will be down for maintenance on 2021-08-02 from 1:00 AM to 3:00 AM.',
        time: '2021-08-01T12:00:00Z',
        isRead: false
      },
      {
        id: '4',
        notificationTitle: 'Update Available',
        message: 'A new update is available for the LMS platform.',
        time: '2021-08-01T12:00:00Z',
        isRead: true
      },
      {
        id: '5',
        notificationTitle: 'Assignment Due',
        message: 'Your assignment is due on 2021-08-05.',
        time: '2021-08-01T12:00:00Z',
        isRead: false
      }
    ] 
    // set timout of 2 sec
    setTimeout(() => {
      this.notifications.next(dummyNotifications.slice(0, count));
    }, 2000);


  }
}
