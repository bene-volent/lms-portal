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

  loading = false;
  error = false;

  required = 3
  notifications: NotificationInput = {
    count:0,
    notifications:[]
  };

  constructor(private notificationService: NotificationService) { 

    this.notificationService.notifications$.subscribe({
      next:(notifications) => {
      this.loading = false
      this.error = false;
      console.log(notifications)
      this.notifications.notifications = notifications;
      this.notifications.count = notifications.length;
    },
    error: (error) => {
      this.loading = false;
      this.error = true;
    }
  });
  }

  toggleMenu(menu:any,event:MouseEvent){
    menu.toggle(event)
    this.getNotifications()
  }

  getNotifications() {
    this.loading = true;
    this.notificationService.getNotifications(this.required);
  }

  readMore(){
    this.required += 3;
    this.getNotifications();
  }

}
