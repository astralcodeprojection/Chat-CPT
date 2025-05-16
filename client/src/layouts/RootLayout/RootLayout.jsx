import React from 'react'
import './RootLayout.css';
import { Link, Outlet } from 'react-router-dom';
import logo from "../../../Public/images/xjewP8.png"

const RootLayout = () => {
  return (
    <div className = "main">
        <header>
            <Link>
                <img src={logo} alt="Website Logo" />
                <span>Chat CPT</span>
            </Link>
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  );
};

export default RootLayout