import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-section',
  standalone: false,
  
  templateUrl: './card-section.component.html',
  styleUrl: './card-section.component.css'
})
export class CardSectionComponent {
  @Input() title: string = '';
}
