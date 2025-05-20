import React from 'react'
import "./SignUp.css"
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return ( 
  
    <div className="signup">
      <SignUp path="/sign-up" signInUrl='/sign-in'/>
    </div>

  );
};

export default SignUpPage;