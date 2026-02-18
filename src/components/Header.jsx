import {Link} from "./Link.jsx"

export function Header(){
  return(
    <header className="header">
      <div className="header-container">
        <h1>Fake Store</h1>

        <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </nav>

        <div className="header-buttons">
          <button className="signUp">
              Login
          </button>
          <button className="login">
              Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}