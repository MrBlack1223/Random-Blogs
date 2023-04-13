import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './loadingScreen.css'
function LoadingScreen({loading}) {

    return (
      <>
        <div className='loadingScreenContainer'>
            <div className='loading'>
                <span className='loadingMessage'>Loading</span> <br/>
                <ClipLoader
                    loading={loading}
                    color = '#f1356d'
                    size = '60px'
                />
            </div>
        </div>
      </>
    );
  }
  
  export default LoadingScreen;