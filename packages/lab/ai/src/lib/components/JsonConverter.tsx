import React, { useEffect } from 'react';
import { domJSON } from '../truncate/filter';

const JsonConverter = () => {
  useEffect(() => {
    // Function to execute code
    const runDomJSON = async () => {
      //Umwandlung der Cody-DOM; Der Platz im Code ist noch unklar.
      //const myNode = document.getElementsByClassName("MuiDataGrid-overlayWrapperInner css-1akuw9y-MuiDataGrid-overlayWrapperInner")[0] as HTMLElement;
      const codyJSON = domJSON.toJSON(document.body, {
        attributes: {
          values: ['name', 'class', 'id', 'data-selector'],
        },
        domProperties: {
          values: [],
        },
      });
      // Output for testing
      console.log(codyJSON);
    };

    // Execute the function
    runDomJSON();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return <div>{/* Your component JSX here */}</div>;
};

export default JsonConverter;
