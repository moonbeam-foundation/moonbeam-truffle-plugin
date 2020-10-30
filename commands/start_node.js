const { exec } = require('child_process');

const start = async () => {
   // Start Node
   exec('docker run --rm -d --name moonbeam_standalone --network host purestake/moonbase:tutorial-v2.2 /moonbase/moonbase-standalone --dev', (error, stdout, stderr) => {
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
      console.log(`Node has started - RPC endpoint http://127.0.0.1:9933 - Container ID ${stdout.substr(0, 12)} \n`);
   });
};

module.exports = start;
