import { Component, Input, model } from '@angular/core';

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
  selector: 'app-modal',
  standalone: false,
  
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  visible = model.required  <boolean>();

}
