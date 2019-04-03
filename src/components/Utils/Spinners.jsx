import React from 'react'

export const SpinnerGrowPrimary = () => {
   return (
      <React.Fragment>
         <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
         </div>
      </React.Fragment>
   );
}

export const SpinnerGrowSuccess = () => {
   return (
      <React.Fragment>
         <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
         </div>
      </React.Fragment>
   );
}