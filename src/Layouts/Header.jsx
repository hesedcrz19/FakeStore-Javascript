import { Link } from "../components/Link.jsx"
import { CategoryFilters } from "../components/CategoryFilters/CategoryFilters.jsx"

export function Header(){
  return(
    <header className="header">

      {/*--------- Only in small screens------- */}
      <nav className="header-nav-small">
        <CategoryFilters />
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
      </nav>

      <div className="header-container">
        <div className="header-leftside">

          {/*--------- Only in small screens -----------*/}
          <button className="header-nav-small-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>

          <h1>Fake Store</h1>
        </div>

        <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </nav>

        <div className="header-buttons">
          <button className="login">
              Login
          </button>
          <button className="signUp">
              Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}