
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { catchError, filter, takeUntil, pluck, take, map, tap } from 'rxjs/operators';
import { of, Subject, Observable, BehaviorSubject, Subscription } from 'rxjs';

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
  // loggedIn: boolean;

  // subscription: Subscription;
  // Use SessionStorage or localStorage or cookies to store your data.

  // SNACKBAR
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}
  ngOnInit() {
    // this.subscription = this.authService.getStatus().subscribe(res => {
    //   console.log(res);
    //   this.loggedIn = res;
    // });
  }

  googleLogin() {
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
    this.authService
      .logout()
      .pipe(
        catchError((error) => of(null)),
        takeUntil(this.destroyed$)
      )
      .subscribe(
        data => {
          // console.log(data);
          this.router.navigate(['/login']);
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    // this.subscription.unsubscribe();
  }
}
