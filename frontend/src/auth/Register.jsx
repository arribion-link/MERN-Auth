
const Register = () => {
  return (
    <div className="auth-card">
      <h1>Register</h1>
      <div className="form-group">
        <label htmlFor="username"></label>
        <input type="text" placeholder="username" />
      </div>
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

export default Register
