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
  /**
   * use fetch
   * method is POST
   * headers that should be set 'Content-Type' and 'Accept'
   * set `credentials` to `include` otherwise cookies won't work
   */
  return Promise.resolve(null);
};

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  /**
   * use fetch
   * method is POST
   * headers that should be set 'Content-Type' and 'Accept'
   * set `credentials` to `include` otherwise cookies won't work
   */
  return Promise.resolve(null);
};
