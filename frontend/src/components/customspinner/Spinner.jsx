import React, { useState, useEffect } from 'react';
import './css.css'; // Create a CSS file for styling

const CustomSpinner = ({msg}) => {
  const [currentSpinner, setCurrentSpinner] = useState(1);

  useEffect(() => {
    // Set an interval to change the spinner every 2 seconds
    const intervalId = setInterval(() => {
      setCurrentSpinner((prevSpinner) => (prevSpinner % 4) + 1);
    }, 2000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
      <img
        src={`images/${currentSpinner}.svg`}
        alt={`images/${currentSpinner}`}
        className="spinner-img"
      />
      {msg}
      
    </div>
  
  );
};

export default CustomSpinner;
