const { exec } = require('child_process');
const fs = require('fs');

const remove = async () => {
  // Get Version from File
  let version;
  try {
    version = JSON.parse(fs.readFileSync('release-version.json')).version;
  } catch (e) {
    console.error(e);
  }

  // Remove Docker Image
  exec(`docker rmi purestake/moonbeam:${version}`, (error, stdout, stderr) => {
    if (error) {
      if (error.message.includes('permission denied')) {
        console.log(`Connect: permission denied. Permission issues, try again with sudo`);
      } else if (error.message.includes('No such image: purestake/moonbase')) {
        console.log(`Error: No purestake/moonbase Docker image found.`);
      } else {
        console.log(`Error: ${error.message}`);
      }
      return;
    }
    if (stderr) {
      console.log(`Error: ${stderr}`);
      return;
    }
    console.log(`${stdout} \n`);

    // Delete Version file
    fs.access('release-version.json', (error) => {
      if (!error) {
        fs.unlinkSync('release-version.json');
      } else {
        console.error('Error occured:', error);
      }
    });
  });
};

module.exports = remove;
