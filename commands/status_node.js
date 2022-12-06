const { exec } = require('child_process');
const fs = require('fs');

const status = async () => {
  // Get Version from File
  let version;
  try {
    version = JSON.parse(fs.readFileSync('release-version.json')).version;
  } catch (e) {
    console.error(e);
  }

  // Status Node
  exec(`docker ps -q --filter ancestor="purestake/moonbeam:${version}"`, (error, stdout, stderr) => {
    if (error) {
      if (error.message.includes('permission denied')) {
        console.log(`Connect: permission denied. Permission issues, try again with sudo`);
      } else {
        console.log(`Error: ${error.message}`);
      }
      return;
    }
    if (stderr) {
      console.log(`Error: ${stderr}`);
      return;
    }

    if (stdout === '') {
      console.log(`Node with version ${version} is not running\n`);
    } else {
      console.log(
        `Node with version ${version} has started - Endpoints: HTTP http://127.0.0.1:9933  WS ws://127.0.0.1:9944 - Container ID ${stdout.substr(
          0,
          12
        )} \n`
      );
    }
  });
};

module.exports = status;
