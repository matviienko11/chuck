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
  inputValue: string;
  pageEvent: PageEvent;
  length: number;
  page: number
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private jokeService: JokesService
  ) { }

  ngOnInit(): void {
    this.getAllJokes();
  }

  getAllJokes() {
    this.jokeService.getAll().subscribe(data => {
      this.jokes = data.result.slice(0, this.pageSize)
      this.length = data.result.length
    });
  }

  getPaginatedJokes(e: PageEvent) {
    console.log(e)
    if(this.inputValue === '') {
      this.getAllJokes()
    } else {
      this.jokeService.getAll(this.inputValue).subscribe(data => {
        this.pageSize = e.pageSize
        this.page = e.pageIndex;
        const start = this.page * this.pageSize;
        const end = start + this.pageSize;
        this.jokes = data.result.slice(start, end)
      })
    }
    return this.pageEvent;
  }

  handleSearch() {
    if(this.inputValue === '') {
      this.getAllJokes()
    } else {
      this.jokeService.getAll(this.inputValue).subscribe(data => {
        this.jokes = data.result.slice(0, this.pageSize)
        this.length = data.result.length
      })
    }
  }
}
