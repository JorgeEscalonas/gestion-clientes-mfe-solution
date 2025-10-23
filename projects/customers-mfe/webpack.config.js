const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'customers-mfe',

  exposes: {
    './Module': './projects/customers-mfe/src/app/customers/customers.routes.ts',
    './CustomerListComponent': './projects/customers-mfe/src/app/customers/components/customer-list.component.ts',
    './CustomerFormComponent': './projects/customers-mfe/src/app/customers/components/customer-form.component.ts'
  },

shared: share({
  "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
}),
  sharedMappings: ['@shared']
});
