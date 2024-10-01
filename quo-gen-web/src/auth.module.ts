import { includes } from "cypress/types/lodash";

const authAPIBase = "http://localhost:3000/api/v1/auth";

export const logout = () => {
  // needs to be implemented
};

export const register = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return fetch('http://localhost:3000/api/v1/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(errorData.message || 'Registration failed');
      });
    }
    return response.json(); 
  });
};


export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${authAPIBase}/login`, {
    method: "POST",
    headers:{ 
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({username, password})
  })

  if (!response.ok) throw new Error("something went wrong")
    return await response.json();

};
