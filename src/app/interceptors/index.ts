import axios from 'axios';
import attachTokenInterceptor from './attach-token.interceptor';
import store from '../store';

let requestInterceptors: number[] = [];
let responseInterceptors: number[] = [];
let listener = {unsubscribe: () => {}};

/**
 * Adds the interceptors for axios request and response
 */
export function initializeInterceptors() {
  listener.unsubscribe();
  listener.unsubscribe = store.subscribe(() => {
    resetInterceptors();
    const {token} = store.getState().user;

    // Attach bearer token to header for every request if user is logged in
    if (token) {
      requestInterceptors.push(
        axios.interceptors.request.use(attachTokenInterceptor(token)),
      );
    }
  });
}

/** Clears any previously set interceptors */
const resetInterceptors = () => {
  if (requestInterceptors.length > 0) {
    requestInterceptors.forEach(i => axios.interceptors.request.eject(i));
    requestInterceptors = [];
  }
  if (responseInterceptors.length > 0) {
    responseInterceptors.forEach(i => axios.interceptors.response.eject(i));
    responseInterceptors = [];
  }
};
