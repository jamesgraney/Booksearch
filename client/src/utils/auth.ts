

import { jwtDecode } from 'jwt-decode';

interface UserToken {
  name: string;
  exp: number;
}


class AuthService {
  // get user data
  getProfile() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return jwtDecode<UserToken>(token);
  }

  // check if user's logged in
  loggedIn() {
    
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
