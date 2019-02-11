const fileSystem = require('fs');

function concatAPI() {
  let api = [];

  api = api.concat(require('./unity_requires'));
  api = api.concat(require('./unity_objects'));
  api = api.concat(require('./unity_properties'));
  api = api.concat(require('./unity_signatures'));

  toFile("api.json", api);

  deleteTemporaryFiles();
}

function deleteTemporaryFiles() {
  try {
    fileSystem.unlinkSync('./unity_requires.json');
    fileSystem.unlinkSync('./unity_objects.json');
    fileSystem.unlinkSync('./unity_properties.json');
    fileSystem.unlinkSync('./unity_signatures.json');
  } catch (error) {
    console.log(error);
  }
}

function toFile(name, api) {
  const json = JSON.stringify(api, null, 2);

  fileSystem.writeFile(name, json, (error) => {
    if(error == null)
      return

    console.log("Error when writing the json file");
    console.log(error);
  });
}

exports.concatAPI = concatAPI;
exports.toFile = toFile;
