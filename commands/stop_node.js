const { exec } = require('child_process');
const fs = require('fs');

const stop = async () => {
  // Get Version from File
  let version;
  try {
    version = JSON.parse(fs.readFileSync('release-version.json')).version;
  } catch (e) {
    console.error(e);
  }

  // Stop node
  exec(`docker stop $(docker ps -q --filter ancestor="purestake/moonbeam:${version}")`, (error, stdout, stderr) => {
    if (error) {
      if (error.message.includes('permission denied')) {
        console.log(`Connect: permission denied. Permission issues, try again with sudo`);
      } else {
        console.log(`Error: ${error.message}`);
        return;
      }
    }
    if (stderr) {
      console.log(`Error: ${stderr}`);
      return;
    }
    console.log(`Node with version ${version} has stopped - Container ID ${stdout}`);
  });
};

module.exports = stop;
