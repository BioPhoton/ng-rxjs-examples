import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { concatMap, exhaustMap, takeWhile, tap } from 'rxjs/operators';
import { FakeBackendForPollingService } from '../services/fake-backend-for-polling.service';

interface Status {
  id: string,
  progress: number
}


@Component({
  selector: 'pol-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent {



  constructor(private api: FakeBackendForPollingService) {

    this.api.initStatus = this.initStatus;
    this.api.progressStatus = this.progressStatus;
    this.api.isDone = this.isDone;

    this.api.getStatusById()
      .pipe(
        concatMap(res => timer(0, 1000)
          .pipe(
            exhaustMap(_ => api.getStatusById<Status>(res['id'])),
            takeWhile(status => !this.isDone(status))
          )
        )
      )
      .subscribe(console.log);

    setTimeout(() =>
        api.getStatusById()
          .pipe(
            concatMap(res => timer(0, 1000)
              .pipe(
                exhaustMap(_ => api.getStatusById<Status>(res['id'])),
                takeWhile(status => !this.isDone(status))
              )
            )
          )
          .subscribe(console.log)
      , 1000);

  }

  initStatus(): Status {
    return {
      id: 'a',
      progress: 0
    };
  }

  progressStatus(s: Status): Status {
    return {
      ...s,
      progress: ((s.progress > 0) ? s.progress : 0) + 1
    };
  }

  isDone(s: Status): boolean {
    return s && s.progress && s.progress >= 5;
  }

}

