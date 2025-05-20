import React from 'react'
import "./ChatMenu.css"
import { Link } from "react-router-dom";
import logo from "../../../Public/images/xjewP8.png"

const ChatMenu = () => {
  return (
    <div className = "chatMenu">
        <span className="title">DASHBOARD</span>
        <Link className="Link">Create a New Chat</Link>
        <Link className="Link">Explore Chat CPT</Link>
        <Link className="Link">Contact Us</Link>

        <hr className="chatMenuHr" />
        <span className="title">PAST CHATS</span>
        <div className="list">
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>
            <Link className="Link">Chat</Link>

        </div>
        <hr className="chatMenuHr" />
        <div className="upgrade">
            <img src={logo} alt="" className="chatMenuPro"/>
            <div className="texts">
                <span>Upgrade to Chat CPT Pro</span>
                <span>Get unlimited access to all features</span>
            </div>
        </div>
    </div>
  );
}

export default ChatMenu;