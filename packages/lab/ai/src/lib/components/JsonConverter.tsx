/* eslint-disable prefer-const */
import React, { useEffect } from 'react';
import { domJSON } from '../truncate/filter';
import { updateClassNames, ClassNameGenerator} from '../truncate/createMaps';

/**
 * React-Component to convert the React-DOM to a JSON
 */
const JsonConverter = function() {
  //useEffect to guarantee that the code is executed after the DOM is mounted
  useEffect(() => {
    // Function to execute code
    const runDomJSON = async () => {
      //Umwandlung der Cody-DOM; toJSON(Node, FilterList)
      const codyJSON = domJSON.toJSON(document.body, {
        attributes: {
          values: ['name', 'class', 'id', 'data-selector'],
        },
        domProperties: {
          values: [],
        },
      });

      //Assigning a key to every class and selector 
      let classMap = new Map<string, string>();
      let selectorMap = new Map<string, string>();
      const classNameGenerator = new ClassNameGenerator();
      updateClassNames(codyJSON, classMap, selectorMap, classNameGenerator);

      // Output for testing
      console.log(codyJSON);
      //console.log(classMap);
      console.log(selectorMap);
    };

    // Execute the function
    runDomJSON();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return <div>{/* Your component JSX here */}</div>;
};

export default JsonConverter;
