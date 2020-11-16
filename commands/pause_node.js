const { exec } = require('child_process');

const pause = async (version) => {
   // Pause Chain
   exec(`docker pause $(docker ps -q --filter ancestor="purestake/moonbase:${version}")`, (error, stdout, stderr) => {
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
      console.log(`Node has paused - Container ID ${stdout.substr(0, 12)} \n`);
   });
};

module.exports = pause;

