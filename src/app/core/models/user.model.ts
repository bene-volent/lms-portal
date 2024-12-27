import { Response } from './response.model';

export interface LoginCredentials {
    loginID: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mobile: string;
}


export interface User{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
    mobile: string;
}

export interface AuthResponse extends Response{
    user: User;
}