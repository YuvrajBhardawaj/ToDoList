import React from 'react';
import { Link } from 'react-router-dom';
function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">To_Do_List</a>
        <div className="d-flex">
          <button type="button" className="btn btn-dark me-2">SignUp</button>
          <Link to="/SignIn"><button type="button" className="btn btn-dark me-2">SignIn</button></Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
