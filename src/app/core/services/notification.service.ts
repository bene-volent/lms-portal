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
    this.getNotifications();
  }

  getNotifications() {
    // Url = /api/notifications/{userId}
    // Method = GET
    // Headers: Authorization: Bearer {token}
    // Response: {count: number, notifications: Notification[]}




    // Actual API call
    // if (this.auth.isAuthenticated()) {
    //   return this.httpClient.get<NotificationResponse>(this.backendURL + 'api/notifications/' + this.auth.userID).pipe(
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
        id: 1,
        notificationTitle: 'Welcome to LMS',
        message: 'Welcome to Learning Management System',
        time: '2021-08-01T12:00:00Z',
        isRead: false
      },
      {
        id: 2,
        notificationTitle: 'New Course',
        message: 'A new course has been added to the platform',
        time: '2021-08-01T12:00:00Z',
        isRead: false
      },
      {
        id: 3,
        notificationTitle: 'New Course',
        message: 'A new course has been added to the platform',
        time: '2021-08-01T12:00:00Z',
        isRead: true
      }
    ]


  }
}
