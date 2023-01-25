const { spawn } = require('child_process');
const axios = require('axios');
const fs = require('fs');

// Install function
const install = async () => {
  const version = "
  try {
    // Get a list of the releases
    const { data } = await axios.get(
      "https://api.github.com/repos/purestake/moonbeam/releases"
    );
    for (var i = 0; i < data.length; i++) {
      // Get the list of assets per release
      const assets = data[i].assets;
      // Filter the assets for the moonbeam asset (if it exists)
      const moonbeamAsset = assets.filter((asset) => asset.name === "moonbeam");
      // If the moonbeam asset exists, save the version and break out of the loop
      if (moonbeamAsset.length > 0) {
        version = data[i].tag_name;
        break;
      }
    }
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }

  // Check if Docker is installed, if not, install it
  const output = spawn('docker', ['-v']);

  // Stream CL output
  output.stderr.on('data', (data) => {
    console.log(`Error: ${data}`);
  });

  // On Close (Docker is installed)
  output.on('close', () => {
    get_docker_image();
  });

  // Docker not installed, installing
  output.on('error', (err) => {
    throw new Error('Docker installation was not found, please install docker: https://docs.docker.com/get-docker/');
  });
};

const get_docker_image = async () => {
  console.log(`Downloading Moonbeam Development Docker image release ${version}`);

  // Pull Moonbeam Container
  const output = spawn('docker', ['pull', `purestake/moonbeam:${version}`]);

  // Stream CL output
  output.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  output.stderr.on('data', (data) => {
    if (data.includes('permission denied')) {
      console.log(`Connect: permission denied. Permission issues, try again with sudo`);
    } else {
      console.log(`Error: ${data}`);
    }
  });

  output.on('close', () => {
    let data = JSON.stringify({
      version: version,
    });

    fs.writeFileSync('release-version.json', data);
  });
};

module.exports = install;
