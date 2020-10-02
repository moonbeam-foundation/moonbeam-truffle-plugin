const { exec } = require('child_process');

const unpause = async () => {
   // Unpause Chain
   exec('docker unpause $(docker ps -q --filter ancestor="purestake/moonbase")', (error, stdout, stderr) => {
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
      console.log(`Node has unpaused - Container ID ${stdout.substr(0, 12)} \n`);
   });
};

module.exports = unpause;

