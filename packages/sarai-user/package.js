Package.describe({
  name: 'sarai:sarai-user',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  var packages = [
    "sarai:sarai-lib",
    "accounts-base@1.2.1",
    "accounts-ui@1.1.6",
    "accounts-password",
    "service-configuration@1.0.5",
  ]

  api.use(packages)
  api.imply(packages)

  var lib = [
    "lib/collections/sarai-user.js"
  ]

  api.addFiles(lib, ["client", "server"])

  var client = [
    "client/config.js"
  ]

  api.addFiles(client, "client")

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('sarai:sarai-user');
});
