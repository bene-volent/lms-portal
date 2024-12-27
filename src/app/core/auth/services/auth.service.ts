import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@core/models';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';


const DUMMY_USER:User ={
  id: 1,
  username: 'dummyUser',
  email: 'dummy@user.com',
  firstName: 'Dummy',
  lastName: 'User',
  role: 'user',
  token: 'dummyToken',
  mobile: '1234567890'
}
const DUMMY_ADMIN:User ={
  id: 2,
  username: 'dummyAdmin',
  email:'dummy@admin.com',
  firstName: 'Dummy',
  lastName: 'Admin',
  role: 'admin',
  token: 'dummyAdminToken',
  mobile: '1234567890'
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject : BehaviorSubject<User|null>;
  public currentUser$: Observable<User|null>;

  constructor(private httpClient: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User|null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();


    // this.currentUserSubject.next(DUMMY_ADMIN)

  }


  login(credentials: LoginCredentials,fromAdmin:boolean = false): Observable<User> {

    const { loginID, password } = credentials;

    if (loginID === 'dummyUser' || loginID === 'dummy@user.com' && password === 'dummyUser@123') {
      return new Observable<User>(observer => {
        setTimeout(() => {
          observer.next(DUMMY_USER);
        }, 2000);
      }).pipe(
        map(user => {
          this.currentUserSubject.next(user);
          return user;
        })
      );
    }

    if (loginID === 'dummyAdmin' || loginID === 'dummy@admin.com' && password === 'dummyAdmin@123') {
      return new Observable<User>(observer => {
        setTimeout(() => {
          observer.next(DUMMY_ADMIN);
        }, 2000);
      }).pipe(
        map(user => {
          this.currentUserSubject.next(user);
          return user;
        })
      );
    }
    
    // return observable that emits error
    
      return new Observable<User>(observer => {
        setTimeout(() => {
          observer.error('Invalid Credentials');
        }, 2000);
      }).pipe(
        map(user => {
          this.currentUserSubject.next(user);
          return user;
        })
      );
    



    let url = fromAdmin ? 'admin/login' : 'user/login';
    return this.httpClient.post<AuthResponse>(url, credentials).pipe(
      map(response => {
        this.currentUserSubject.next(response.user);
        return response.user
      })
    );
  }

  logout(){
    this.currentUserSubject.next(null);
  }

  registerUser(creds: RegisterCredentials): Observable<User> {
    return this.httpClient.post<AuthResponse>('user/register', creds).pipe(
      map(response => {
        this.currentUserSubject.next(response.user);
        return response.user;
      })
    );
  }

  getCurrentUser(): User|null {
    return this.currentUserSubject.value;
  }


  getUserRole() {
    return this.getCurrentUser()?.role;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getAuthorizationToken(): string {
    const user = this.getCurrentUser();
    return user ? user.token : '';
  }
}
