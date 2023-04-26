import React from 'react';
import './errorScreen.css'

function ErrorScreen() {

    return (
      <>
        <div className='errorScreenContainer'>
            <div className='error'>
                <span className='errorMessage'>
                    Can't fetch data... comeback later 
                </span>
            </div>
        </div>
      </>
    );
  }
  
  export default ErrorScreen;