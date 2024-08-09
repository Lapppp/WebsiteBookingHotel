import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchParamsSubject = new BehaviorSubject<any>({});
  searchParams$ = this.searchParamsSubject.asObservable();

  setSearchParams(params: any) {
    this.searchParamsSubject.next(params);

  }
}
