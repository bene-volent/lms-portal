import { Component } from '@angular/core';
import { Notification } from '@core/models/notification.model';
import { NotificationService } from '@core/services/notification.service';



interface NotificationInput{
  count: number;
  notifications: Notification[];
}

@Component({
  selector: 'app-notifications',
  standalone: false,
  
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notifications: NotificationInput = {
    count:0,
    notifications:[]
  };

  constructor(private notificationService: NotificationService) { 
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications.notifications = notifications;
      this.notifications.count = notifications.length;
    });
  }

}
