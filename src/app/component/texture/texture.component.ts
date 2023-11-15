import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.css']
})
export class TextureComponent {
  constructor(public route: ActivatedRoute) {}
}
