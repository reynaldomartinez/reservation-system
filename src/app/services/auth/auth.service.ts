import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { from, Observable, BehaviorSubject, Subject } from 'rxjs';

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject(null);

  private status = new Subject<boolean>();
  status$ = this.status.asObservable();

  user$: Observable<firebase.User> = this.user.asObservable()
      .pipe(
        switchMap((authFireUser: Observable<firebase.User>) => authFireUser)
      );
  constructor( private afAuth: AngularFireAuth) {
      this.user.next(afAuth.user);
    }

    googleLogin(): Observable<auth.UserCredential> {
      this.status.next(true);
      return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
    }

    logout(): Observable<void> {
      this.status.next(false);
      return from(this.afAuth.signOut());
    }

    setStatus(val: boolean) {
      this.status.next(val);
    }

}