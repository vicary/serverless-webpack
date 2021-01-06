'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');
const fse = require('fs-extra');

module.exports = {
  cleanup() {
    const webpackOutputPath = this.webpackOutputPath;
    const keepOutputDirectory = this.keepOutputDirectory;
    const cli = this.options.verbose ? this.serverless.cli : { log: _.noop };

    const keepOutputDirectory = this.keepOutputDirectory;
    if (!keepOutputDirectory) {
      cli.log(`Remove ${webpackOutputPath}`);
      if (this.serverless.utils.dirExistsSync(webpackOutputPath)) {
        // Remove async to speed up process
        fse
          .remove(webpackOutputPath)
          .then(() => cli.log(`Removing ${webpackOutputPath} done`))
          .catch(error => cli.log(`Error occurred while removing ${webpackOutputPath}: ${error}`));
      }
    } else {
      cli.log(`Keeping ${webpackOutputPath}`);
    }

    return BbPromise.resolve();
  }
};
