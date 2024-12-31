import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: false
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string|number): string {
   
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return 'Just now';
    }
    if (minutes < 60) {
      return minutes + 'm ago';
    }
    if (hours < 24) {
      return hours + 'h ago';
    }
    if (days < 7) {
      return days + 'd ago';
    }
    if (weeks < 4) {
      return weeks + 'w ago';
    }
    if (months < 12) {
      return months + 'mo ago';
    }
    return years + 'y ago';
    
    
  }

}
