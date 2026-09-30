import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AppUser {
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'firmeza-auth-session';

  readonly currentUser = signal<AppUser | null>(this.readSession());

  login(email: string, password: string): Observable<boolean> {
    const valid = email === 'admin@firmeza.local' && password === '123456';

    if (!valid) {
      return of(false);
    }

    const user: AppUser = {
      email,
      role: 'Administrador',
    };

    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.currentUser.set(user);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  private readSession(): AppUser | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AppUser;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
