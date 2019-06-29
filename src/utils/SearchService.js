import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export class SearchService {
    constructor(fetchResults) {
        this.searchTerm = new Subject();
        this.fetchResults = fetchResults
    }

    search(term) {
        this.searchTerm.next(term);
    }

    doSearch(term) {
       let promise = this.fetchResults(term)

        return Observable
            .fromPromise(promise)
    }

    getResults() {
        return this.searchTerm
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(term => term
                ? this.doSearch(term) : Observable.of([]))
            .catch(error => {
                console.error(error);
                return Observable.of([]);
            });
    }
}
