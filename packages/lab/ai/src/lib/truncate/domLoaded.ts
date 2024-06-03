import { domJSON } from "./filter";

document.addEventListener('DOMContentLoaded', () => {
    const codyJSON = domJSON.toJSON(document.body, {
        attributes: {
          values: ['name', 'class', 'id', 'data-selector'],
        },
        domProperties: {
          values: [],
        },
      });

    /*Hashmap-Logik hier :) */  
    console.log(codyJSON);
});

