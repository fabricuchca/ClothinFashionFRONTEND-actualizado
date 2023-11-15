import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-typeclothing',
  templateUrl: './typeclothing.component.html',
  styleUrls: ['./typeclothing.component.css']
})
export class TypeclothingComponent {
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}
}
