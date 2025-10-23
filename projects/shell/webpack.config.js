const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    "customersMfe": "http://localhost:4201/remoteEntry.js",
  },
shared: share({
  "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
}),
  sharedMappings: ['@shared']
});
