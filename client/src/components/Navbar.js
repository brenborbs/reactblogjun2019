import React from "react";
import { Link } from "react-router-dom";
import Signout from "../components/Auth/Signout";

const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <ul className="nav justify-content-center">
    <li className="nav-item">
      <Link className="nav-link" to="/">
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/search">
        Search
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/blog/add">
        Create New Blog
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/profile">
        Profile
      </Link>
    </li>
    <div className="">
      <Signout />
    </div>
  </ul>
);

const NavbarUnAuth = () => (
  <ul className="nav justify-content-center">
    <li className="nav-item">
      <Link className="nav-link" to="/">
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/search">
        Search
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signin">
        Signin
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signup">
        Register
      </Link>
    </li>
  </ul>
);

export default Navbar;
