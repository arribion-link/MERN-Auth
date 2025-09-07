import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div>
          <h1>Hello Developer</h1>

          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button>Register</button>
          </Link>
    </div>
  )
}

export default Home
