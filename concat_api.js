const fileSystem = require('fs');

let api = [];
let requires = require('./unity_requires');

api = api.concat(requires);
requires = null;

let objects = require('./unity_objects');

api = api.concat(objects);
objects = null;

let properties = require('./unity_properties');

api = api.concat(properties);
properties = null;

let signatures = require('./unity_signatures');

api = api.concat(signatures);
signatures = null;

api = JSON.stringify(api, null, 2);
fileSystem.writeFile("unity_api.json", api, (error) => {
  if(error == null)
    return

  console.log("Error when writing the json file");
  console.log(error);
});
