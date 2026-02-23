import "./Header.css";

import { useModal } from "../../hooks/useModal.jsx";
import { useMatchMedia } from "../../hooks/useMatchmedia.jsx";
import { useRef } from "react";
import { Link } from "../../components/Link.jsx";
import { CategoryFilters } from "../../components/CategoryFilters/CategoryFilters.jsx";

export function Header(){
  const navRef = useRef(null);

  const isMobile = useMatchMedia("(max-width: 700px)");
  const {openModal: openNavbar, closeModal: closeNavbar} = useModal(navRef, isMobile);

  return(
    <header className="header">

      {/*--------- Only can open in small screens------- */}
      <dialog className="header-nav-dialog" ref={navRef}>
        <button className="closeDialog-button" onClick={closeNavbar}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button>

        <CategoryFilters className="smallForm"/>

        <hr />

        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </div>
      </dialog>

      <div className="header-container">
        <div className="header-leftside">

          {/*--------- Only in small screens -----------*/}
          {
            isMobile &&
            <button className="openDialog-button" onClick={openNavbar}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </button>
          }

          <h1><Link href="/">Fake Store</Link></h1>
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