import {Component, OnInit} from '@angular/core';
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
  isError: boolean = true

  constructor(
    private jokeService: JokesService
  ) {
  }

  ngOnInit(): void {
    this.getAllJokes();
  }

  getAllJokes() {
    this.jokeService.getAll(this.inputValue).subscribe(data => {
        if (data.result.length === 0) this.isError = true
        this.jokes = data.result.slice(0, this.pageSize)
        this.length = data.result.length
      }, () => this.isError = true)
  }

  getPaginatedJokes(e: PageEvent) {
    this.jokeService.getAll(this.inputValue).subscribe(data => {
      console.log(data);
      this.pageSize = e.pageSize
      this.page = e.pageIndex;
      const start = this.page * this.pageSize;
      const end = start + this.pageSize;
      this.jokes = data.result.slice(start, end)
    })
    return this.pageEvent;
  }

  handleSearch() {
    this.jokeService.getAll(this.inputValue).subscribe(data => {
      console.log(data);
      if (data.result.length === 0) {
        this.isError = true
      } else {
        this.isError = false
        this.length = data.result.length
        return this.jokes = data.result.slice(0, this.pageSize)
      }
    }, () => this.isError = true)
  }
}
