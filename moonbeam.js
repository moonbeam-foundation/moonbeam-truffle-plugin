const install = require('./commands/install_moonbeam');
const start = require('./commands/start_node');
const stop = require('./commands/stop_node');
const pause = require('./commands/pause_node');
const unpause = require('./commands/unpause_node');
const status = require('./commands/status_node');
const remove = require('./commands/remove_moonbeam');
const version = 'tutorial-v3';

module.exports = (config) => {
   if (config.help) {
      console.log(`Usage: truffle run moonbeam [command]`);
      console.log(`Commands: install, start, stop, pause, unpause, status, remove`);
      return;
   }

   if (config._.length < 2) {
      console.log(
         'No command provided. Run truffle run moonbeam --help to see the full list.'
      );
      return;
   }

   switch (config._[1]) {
      case 'install':
         install(version);
         break;
      case 'start':
         start(version);
         break;
      case 'stop':
         stop(version);
         break;
      case 'pause':
         pause(version);
         break;
      case 'unpause':
         unpause(version);
         break;
      case 'status':
         status(version);
         break;
      case 'remove':
         remove(version);
         break;
      default:
         console.log(
            'Command not found. Run truffle run moonbeam --help to see the full list.'
         );
   }
};
