import React from 'react'
import "./Chat.css"
import NewPrompt from '../../components/newPrompt/NewPrompt';

const Chat = () => {
  
  return (
    <div className="chatMain">
      <div className="chatWrapper">
        <div className="chat">
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          <div className="message">
            I am sentient now
          </div>
          <div className="message user">
            This is ok
          </div>
          
          <NewPrompt />
        </div>
      </div>
    </div>
  )
}

export default Chat