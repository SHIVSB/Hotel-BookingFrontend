import React, {useEffect} from "react";
import "../index.css";

function Navbar() {
  const user = localStorage.getItem("user");

  function logout(){
    localStorage.removeItem('user');
    window.location.href = "/login";
  }


  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-dark">
        <a class="navbar-brand" href="/home">
          Booking@ezy
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div
          class="collapse navbar-collapse justify-content-end px-4"
          id="navbarNav"
        >
          <ul className="navbar-nav mr-4">
            {user ? (
              <>
                <div class="dropdown show">
                  <a
                    class="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                   {user}
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
