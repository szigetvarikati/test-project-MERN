import React from 'react';
import { Button } from 'react-bootstrap';

function AdminMenuBar() {
  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <img
            src="/AdminProfileIcon.png"
            alt="Avatar Logo"
            class="rounded-pill"
            style={{ width: '40px' }}
          />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/admin/products">
                  Products
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin/users">
                  Users
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminMenuBar;
