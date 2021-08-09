import { Component, OnInit } from '@angular/core';
import {JokesService} from "../../services/jokes.service";
import {Joke} from "../../interfaces/joke.interface";

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit {

  jokes: Joke[] = [];

  constructor(
    private jokeService: JokesService
  ) { }

  ngOnInit(): void {
    this.jokeService.getAll().subscribe(data => this.jokes = data.result);
  }

}
