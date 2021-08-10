import { Component, OnInit } from '@angular/core';
import {JokesService} from "../../services/jokes.service";
import {Joke} from "../../interfaces/joke.interface";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit {

  jokes: Joke[] = [];
  pageEvent: PageEvent;
  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private jokeService: JokesService
  ) { }

  ngOnInit(): void {
    this.jokeService.getAll().subscribe(data => {
      this.jokes = data.result.slice(0, this.pageSize)
      this.length = data.result.length
    });
  }

  getAllJokes(e: PageEvent) {
    this.jokeService.getAll().subscribe(data => {
      const page = e.pageIndex;
      const start = page * this.pageSize;
      const end = start + this.pageSize;
      this.jokes = data.result.slice(start, end)
    })
    return this.pageEvent;
  }

}
