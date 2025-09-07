
const Login = () => {
  return (
    <div className="auth-card">
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="email"></label>
        <input type="email" placeholder="Email" />
      </div>
      <div className="form-group">
        <label htmlFor="password"></label>
        <input type="password" placeholder="Password" />
      </div>
    </div>
  );
}

export default Login
