import React from 'react';

function Login1() {
  const handleLogin = () => {
  //window.location.href = "http://localhost:8080/oauth2/authorization/google";
  window.location.href =
"http://localhost:8080/oauth2/authorization/google?prompt=select_account";
};
  return (
    <div>
      <h1>Login Page</h1>
      <br></br>
      <button onClick={handleLogin}>
  Login with Google
</button>
    </div>
  );
}

export default Login1;