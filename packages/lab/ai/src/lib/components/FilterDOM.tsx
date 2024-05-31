import React, { useEffect } from 'react';

const FilterDOM = () => {
    useEffect(() => {
      // Create a script element
      const script = document.createElement('script');
      // Set the source of the script to the URL of the script you want to insert
      script.src = '../truncate/domJSON.js';
      script.type = 'module';
      // Add any attributes or event listeners to the script if necessary
      // For example:
      // script.async = true;
      // script.onload = () => { console.log('Script loaded!'); };
      // Append the script element to the document body
      document.body.appendChild(script);
      // Clean up: remove the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }, []); // empty dependency array means this effect runs only once when the component mounts
  
    return (
      <div>
        {/* Your component JSX */}
      </div>
    );
  };
  
  export default FilterDOM;