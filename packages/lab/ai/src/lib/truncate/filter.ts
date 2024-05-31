import createDomJSON = require("../truncate/domJSON");

console.log("Hello World");

const rawDomJSON = createDomJSON();
const myDiv = rawDomJSON.toJSON(document.body, {
    attributes: {
        values: ['name', 'class', 'id', 'data-selector']
    },
    domProperties: {
        values: []
    }
});

console.log(myDiv);