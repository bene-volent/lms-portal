import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@core/models';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';


const DUMMY_USER: User = {
  id: 1,
  username: 'dummyUser',
  email: 'dummy@user.com',
  firstName: 'Dummy',
  lastName: 'User',
  role: 'user',
  token: 'dummyToken',
  mobile: '1234567890'
}
const DUMMY_ADMIN: User = {
  id: 2,
  username: 'dummyAdmin',
  email: 'dummy@admin.com',
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

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  public userID: number|null = null;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();


    // check local storage with key 'lms-portal-config' and look for property user
    // if present, set it to currentUserSubject

    // this.currentUserSubject.next(DUMMY_ADMIN)
    this.getUserFromLocalStorage();

  }

  getUserFromLocalStorage() {


    //  To be complete scrapped

    let data = localStorage.getItem('lms-portal-config');
    let parsedData = data ? JSON.parse(data) : null;
    
    if (parsedData && parsedData.user) {
      this.currentUserSubject.next(parsedData.user);
    }
  }

  saveUserToLocalStorage(user: User) {
    //  To be complete scrapped
    localStorage.setItem('lms-portal-config', JSON.stringify({ user }));
  }


  login(credentials: LoginCredentials): Observable<User> {

    const { loginID, password } = credentials;

    if (loginID === 'dummyUser' || loginID === 'dummy@user.com' && password === 'dummyUser@123') {
      return new Observable<User>(observer => {
        setTimeout(() => {
          this.saveUserToLocalStorage(DUMMY_USER);
          this.userID = DUMMY_USER.id;
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
          this.saveUserToLocalStorage(DUMMY_ADMIN);
          this.userID = DUMMY_ADMIN.id;
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




    let url = 'http://localhost:3000/auth/login';
    return this.httpClient.post<AuthResponse>(url, credentials).pipe(
      map(response => {
        this.currentUserSubject.next(response.user);
        return response.user
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    this.userID = null;
    // remove user from local storage
    
    let data = localStorage.getItem('lms-portal-config');

    if (data) {
      let parsedData = JSON.parse(data);
      delete parsedData.user;
      localStorage.setItem('lms-portal-config', JSON.stringify(parsedData));
    }
    

  }

  registerUser(creds: RegisterCredentials): Observable<User> {
    return this.httpClient.post<AuthResponse>('user/register', creds).pipe(
      map(response => {
        this.currentUserSubject.next(response.user);
        return response.user;
      })
    );
  }

  getCurrentUser(): User | null {
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
