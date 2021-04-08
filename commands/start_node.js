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

const asyncExec = async (command) => {
   return new Promise((resolve, reject) => {
      const callback = (error, stdout, stderr) => {
         if (error) {
            if (error.message.includes("permission denied")){
               reject(`Connect: permission denied. Permission issues, try again with sudo`);
            } else {
               reject(`Error: ${error.message}`);
            }
         } else if (stderr) {
            reject(`Error: ${stderr}`);
         } else {
            resolve(stdout);
         }
      }
      exec(command, callback);
   })
}

const start = async (version, httpPort, wsPort) => {
   const publishHttpPort = `-p ${httpPort}:9933`
   const publishWsPort = `-p ${wsPort}:9944`

   // Start Node
   try {
      let stdout;
      if (isMacOS) {
         // MacOS typically needs to publish the port, so if a user doesn't specify a port let's 
         // use the defaults 9933 for http and 9944 for ws.
         stdout = await asyncExec(`docker run --rm -d --name moonbeam_development ${httpPort ? publishHttpPort : "-p 9933:9933"} ${wsPort ? publishWsPort : "-p 9944:9944"} purestake/moonbeam:${version} --dev --ws-external --rpc-external`);
      } else {
         // If user is not on MacOS, then we only need to publish the port if the user specifies one
         stdout = await asyncExec(`docker run --rm -d --name moonbeam_development --network host ${httpPort || publishHttpPort } ${wsPort || publishWsPort } purestake/moonbeam:${version} --dev`);
      }

      console.log(`Node has started - Endpoints: HTTP http://127.0.0.1:${httpPort || '9933'}  WS ws://127.0.0.1:${wsPort || '9944'} - Container ID ${stdout.substr(0, 12)} \n`);
   } catch(e) {
      console.log(e);
   }
}

module.exports = start;
