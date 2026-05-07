
const { exec } = require('child_process');

function runBackupCommand(targetName) {
  const command = `echo Backing up ${targetName}`;

  exec(command, () => {
  });

  return command;
}

module.exports = {
  runBackupCommand,
};
