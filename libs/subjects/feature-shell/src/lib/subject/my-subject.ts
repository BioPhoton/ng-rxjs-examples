import {
  Unsubscribable,
  Observer,
  Subscription,
  Observable,
  Subscriber,
  SubscriptionLike
} from 'rxjs';

interface MySubscriptionLike extends Unsubscribable {
  // readonly closed: boolean;
  unsubscribe(): void;
}

export class SubjectSubscriber<T> extends Subscriber<T> {
  constructor(protected destination: MySubject<T>) {
    super(destination);
  }
}

export class MySubject<T> extends Observable<T> implements SubscriptionLike {

  observers: Observer<T>[] = [];
  readonly closed: boolean;

  constructor() {
    super();
  }

  next(value?: any) {
    this.observers.forEach((observer) => observer.next(value));
  }

  error(err: any) {
    this.observers.forEach((observer) => observer.error(err));
    this.observers = [];
  }

  complete() {
    this.observers.forEach((observer) => observer.complete());
    this.observers = [];
  }

  unsubscribe() {
    this.observers = [];
  }

  // noinspection JSAnnotator
  subscribe(observer: any): any {

    this.observers.push(observer);
    return new Subscription(() => {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    });

  }

}
