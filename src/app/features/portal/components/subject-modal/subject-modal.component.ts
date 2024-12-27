import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Content{
  id: string;
  thumbnail: string;
  subject: string;
  topic: string;
  description: string;
  detailedDescription: string;
  isEnrolled: boolean;
}

@Component({
  selector: 'app-subject-modal',
  standalone: false,
  
  templateUrl: './subject-modal.component.html',
  styleUrl: './subject-modal.component.css'
})
export class SubjectModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() data: Content | null = null;

  

  hideDialog() {
      this.visible = false;
      this.visibleChange.emit(this.visible);
  }

}
