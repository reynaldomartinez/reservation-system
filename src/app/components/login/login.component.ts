import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { catchError, filter, takeUntil, pluck, take, map } from 'rxjs/operators';
import { of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroyed$: Subject<null> = new Subject();
  user$: Observable<firebase.User> = this.authService.user$;
  subscription;
  loggedIn;

  // SNACKBAR
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {

     }

  ngOnInit() {
  
    this.subscription = this.authService.status$.subscribe( x => {
      this.loggedIn = x;
    });
  }

  googleLogin() {
    this.authService.setStatus(true);
    this.authService
      .googleLogin()
      .pipe(
        catchError(error => of(null)),
        filter((res) => res),
        takeUntil(this.destroyed$)
      ).subscribe(
        data => {
          this.snackBar.open('welcome back', 'Close', {
            duration: 9000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          // console.log();
          this.router.navigate(['']);
        }
      );
  }

  logout() {
    this.authService.setStatus(false);
    this.authService
      .logout()
      .pipe(
        catchError((error) => of(null)),
        takeUntil(this.destroyed$)
      )
      .subscribe(
        data => {
          // console.log(data);
          this.router.navigate(['']);
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
