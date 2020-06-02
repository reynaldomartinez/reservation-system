import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { from, Observable, BehaviorSubject, Subject } from 'rxjs';

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject for change in user
  private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject(null);

  // Subject for boolean(signed in || !signed in)
  // status = new BehaviorSubject<boolean>(false);
  // status$ = this.status.asObservable();

  // Use SessionStorage or localStorage or cookies to store your data.

  user$: Observable<firebase.User> = this.user.asObservable()
      .pipe(
        switchMap((authFireUser: Observable<firebase.User>) => authFireUser)
      );
  constructor( private afAuth: AngularFireAuth) {
      this.user.next(afAuth.user);

    }

    googleLogin(): Observable<auth.UserCredential> {
      // this.status.next(true);
      return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
    }

    logout(): Observable<void> {
      // this.status.next(false);
      return from(this.afAuth.signOut());
    }
}
