import {Component, Input, OnInit} from '@angular/core';
import {Joke} from "../../interfaces/joke.interface";

@Component({
  selector: 'app-joke-item',
  templateUrl: './joke-item.component.html',
  styleUrls: ['./joke-item.component.scss']
})
export class JokeItemComponent implements OnInit {

  @Input() joke: Joke;

  constructor() { }

  ngOnInit(): void {
  }

  handle(joke: any) {
    console.log(joke)
  }

}
