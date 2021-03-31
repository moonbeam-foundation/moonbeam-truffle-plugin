const { exec } = require('child_process');

const isMacOS = () => {
   // Detect the operating system using process:
   // https://nodejs.org/api/process.html#process_process_platform
   const platform = process.platform;
   if (platform === "darwin") {
      return true;
   } else {
      return false;
   }
}

const callback = (error, stdout, stderr) => {
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
};

const start = async (version) => {
   // Start Node
   if (isMacOS()){
      exec(`docker run --rm -d --name moonbeam_standalone -p 9944:9944 -p 9933:9933 purestake/moonbeam:${version} --dev --ws-external --rpc-external`, callback);
   } else {
      exec(`docker run --rm -d --name moonbeam_standalone --network host purestake/moonbeam:${version} --dev`, callback);
   }
};

module.exports = start;
