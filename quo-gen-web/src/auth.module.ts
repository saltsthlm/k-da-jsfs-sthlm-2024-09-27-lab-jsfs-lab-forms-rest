import { includes } from "cypress/types/lodash";

const authAPIBase = "http://localhost:3000/api/v1/auth";

export const logout = () => {
  // needs to be implemented
};

export const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${authAPIBase}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const jsonResponse = await response.json();
    throw new Error(jsonResponse.message || 'Registration failed');
  }
    
  return await response.json(); 
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${authAPIBase}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const jsonResponse = await response.json();
    throw new Error(jsonResponse.message || 'Registration failed');
  }
    
  return await response.json();
};
