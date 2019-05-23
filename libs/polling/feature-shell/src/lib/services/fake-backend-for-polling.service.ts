import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class FakeBackendForPollingService {

  items = [];
  getID = generateUniqueId();
  responseDelay = 1000;

  initStatus = () => {
    return {
      id: this.getID(),
      progress: 0,
    }
  }

  progressStatus = (s) => {
    return {
      ...s,
      progress: 1 + s.progress | 0
    }
  }
  isDone = (respons): boolean => {
    return respons && respons.progress && respons.progress >= 4;
  }

  getStatusById = <T>(id?:string): Observable<T> => {
    let item = this.getItem(id);
    // if status is marked as done just return
    if(this.isDone(item)) {
      return of(item).pipe(delay(this.responseDelay));
    }

    // if the id does not exist it is the initial request
    if(!item)  {
      item = this.initStatus();
      this.items.push(item);
    }
    // update statue by id
    else {
      item = this.progressStatus(item);
      this.items =  this.items.reduce((rl, i) => {
        if(i.id === item.id) {
          i = {...i, ...item}
        }
        return  [...rl, i];
      }, []);
    }

    return of(item).pipe(delay(this.responseDelay));
  }

  getItem(id) {
    return this.items.find(i => i.id === id);
  }

  constructor() {

  }


}

function generateId (len = 10): string {
  const arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('');
}

function dec2hex (dec): string {
  // dec2hex :: Integer -> String
  return ('0' + dec.toString(16)).substr(-2)
}

function generateUniqueId (n?: number) {
  const uids: string[] =  [];
  return () => {
    let newId = generateId(n);
    while(uids.find(i => i === newId)) {
      newId  = generateId(n);
    }
    uids.push(newId);
    return newId;
  }
}

