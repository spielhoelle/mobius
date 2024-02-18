const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    sequence: './blocks/sequence',
    mediacategories: './blocks/mediacategories',
  },
}
