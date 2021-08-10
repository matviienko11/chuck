import {Component, OnDestroy, OnInit} from '@angular/core';
import {JokesService} from "../../services/jokes.service";
import {Joke} from "../../interfaces/joke.interface";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, Validators} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit, OnDestroy {

  jokes: Joke[] = [];
  length: number;
  page: number
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isError: boolean = true;
  search: FormControl;

  private readonly destroy$: Subject<void>;

  constructor(
    private jokeService: JokesService
  ) {
    this.search = new FormControl('', [Validators.minLength(3)]);
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => this.getJokes()),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPaginatedJokes(e: PageEvent) {
    this.Jokes$.subscribe(data => {
      this.pageSize = e.pageSize
      this.page = e.pageIndex;
      const start = this.page * this.pageSize;
      const end = start + this.pageSize;
      this.jokes = data.result.slice(start, end)
    })
  }

  private getJokes(): Observable<any> {
    return this.Jokes$
      .pipe(
        map(data => {
          if (data.result.length === 0) {
            this.isError = true;
          } else {
            this.isError = false;
            this.length = data.result.length;
            return this.jokes = data.result.slice(0, this.pageSize);
          }
        }),
        catchError(() => {
          this.isError = true;
          return of([]);
        })
    )
  }

  private get Jokes$() {
    return this.jokeService.getAll(this.search.value);
  }
}
