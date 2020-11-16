const { exec } = require('child_process');

const start = async (version) => {
   // Start Node
   exec(`docker run --rm -d --name moonbeam_standalone --network host purestake/moonbase:${version} /moonbase/moonbase-standalone --dev`, (error, stdout, stderr) => {
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
      console.log(`Node has started - Endpoints: HTTP http://127.0.0.1:9933  WS ws://127.0.0.1:9944 - Container ID ${stdout.substr(0, 12)} \n`);
   });
};

module.exports = start;
