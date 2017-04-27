Package.describe({
  name: 'sarai:sarai-fertility-map',
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
    "sarai:sarai-user",
    "sarai:sarai-admin",
    "sarai:sarai-layout",
    "maazalik:highcharts",
  ]

  api.use(packages)
  api.imply(packages)

  var client = [
    //fertility
    "client/components/fertility-map/fertility-map.html",
    "client/components/fertility-map/fertility-map.js",
    //"client/components/fertility-map/fertility-map.less",

    "client/components/fertility-map/route.js",

    "lib/highmapsHelper.html",
    "lib/highmapsHelper.js",
    "lib/ph-all.js"
  ]

  api.addFiles(client, "client")

  api.addAssets([
    
    ], "client")
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('sarai:sarai-fertility-map');
});
