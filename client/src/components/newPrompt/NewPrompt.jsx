import React, { useEffect, useRef } from 'react'
import "./NewPrompt.css"
import attachment from "../../../Public/images/attachment.png"
import arrow from "../../../Public/images/arrow.png"

const NewPrompt = () => {

  
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: "smooth"})
  },[])

  return (
    <>
        <div ref={endRef} className="endChat"/>
        <form className='newForm'>
            <label htmlFor="file" className="newFormLabel">
                <img src={attachment} alt="" className="newFormButtonImage"/>
            </label>
            <input type="file" id="file"  hidden multiple={false} className="newFormInput"/>
            <input type="text" placeholder="Ask me anything..." className="newFormInput"/>
            <button className="newFormButton">
                <img src={arrow} alt="" className="newFormButtonImage"/>
            </button>
        </form>
    </>
  )
}

export default NewPrompt