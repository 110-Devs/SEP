import { useEffect } from 'react';


/**
 * Insert the edited JavaScript library domJSON to React
 * @returns returns the filtered JSON object
 */
const useScript = (url: string) => {
    useEffect(() => {
      // Create a script element
      const script = document.createElement('script');
      // Set the source of the script to the URL of the script you want to insert
      script.src = url; // '../truncate/domJSON.js';
      script.type = 'module';
      script.async = true;
      // Add any attributes or event listeners to the script if necessary
      // For example:
      // script.onload = () => { console.log('Script loaded!'); };
      // Append the script element to the document body
      document.body.appendChild(script);
      console.log("Script was successfully loaded!")
      // Clean up: remove the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }, [url]); // empty dependency array means this effect runs only once when the component mounts
  };
  
  export default useScript;