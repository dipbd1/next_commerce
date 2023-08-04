"use server"
import { cookies } from "next/headers"


//  obsolete, using next-auth instead

export async function login(username: string, password: string) {
  // define the API endpoint and request options
  const url = 'https://fakestoreapi.com/auth/login';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // set the content type to JSON
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };


  // send the login request to the API
  const response = await fetch(url, options);

  if (response.status === 200) {
    // store the JWT in the cookie
    const token = await response.json();
    if (token !== null) {
      cookies().set('token', token, {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      return token;
    } else {
      throw new Error('Token is null.');
    }
  } else {
    const error = await response.text();
    throw new Error(`Login failed: ${error}`);
  }
}