import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() diameter: number = 40; // Customize the diameter of the spinner (default: 40)
  @Input() strokeWidth: number = 4; // Customize the stroke width of the spinner (default: 4)
  overlay = true;
}
