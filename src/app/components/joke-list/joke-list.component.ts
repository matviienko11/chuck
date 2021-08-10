import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {JokesService} from "../../services/jokes.service";
import {Joke} from "../../interfaces/joke.interface";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FormControl, Validators} from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged, filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap
} from "rxjs/operators";
import {merge, Observable, of, Subject} from "rxjs";

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  jokes$: Observable<Array<Joke>>;
  length: number;
  page: number
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isError: boolean = true;
  search: FormControl;

  trackById = (index: number, { id }: Joke) => id;

  private readonly destroy$: Subject<void>;

  constructor(private jokeService: JokesService) {
    this.search = new FormControl('', [Validators.minLength(3)]);
    this.destroy$ = new Subject<void>();
  }

  ngAfterViewInit(): void {
    this.jokes$ = merge(this.Search$, this.Pagination$);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private get Search$() {
    return this.search.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        filter(() => this.search.valid),
        switchMap(() => this.getJokes()),
        takeUntil(this.destroy$)
      );
  }

  private get Pagination$() {
    return this.paginator.page
      .pipe(
        switchMap((page: PageEvent) =>
          this.Jokes$
            .pipe(
              map(data => {
                this.pageSize = page.pageSize
                this.page = page.pageIndex;
                const start = this.page * this.pageSize;
                const end = start + this.pageSize;
                return data.result.slice(start, end);
              })
            )
        ),
        takeUntil(this.destroy$)
      );
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
            return data.result.slice(0, this.pageSize);
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
