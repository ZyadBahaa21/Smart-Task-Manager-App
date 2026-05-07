
const fs = require('fs');
const path = require('path');
 
function readTrainingTemplate(requestedFileName) {
  const templateRoot = path.join(__dirname, 'templates');
  const resolvedPath = path.join(templateRoot, requestedFileName);

  if (!fs.existsSync(resolvedPath)) {
    return null;
  }

  return fs.readFileSync(resolvedPath, 'utf8');
}

module.exports = {
  readTrainingTemplate,
};
