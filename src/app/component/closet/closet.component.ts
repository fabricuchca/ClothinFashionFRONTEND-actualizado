import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.css'],
})
export class ClosetComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
