Package.describe({
  name: 'sarai:sarai-icm',
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
    "sarai:sarai-icm-data"
  ] 

  api.use(packages)
  api.imply(packages)

  var client = [
    "client/components/sarai-icm-corn/index.html",
    "client/components/sarai-icm-corn/index.js",
    "client/components/sarai-icm-corn/route.js",
    "client/components/sarai-icm-corn/on-created.js",
    "client/components/sarai-icm-corn/includes/banner/corn-banner.html",
    "client/components/sarai-icm-corn/includes/banner/corn-banner.js",
    "client/components/sarai-icm-corn/includes/article/corn-article.html",
    "client/components/sarai-icm-corn/includes/article/corn-article.js",
    "client/components/sarai-icm-corn/includes/blog-list/corn-blog-list.html",
    "client/components/sarai-icm-corn/includes/blog-list/corn-blog-list.js",
    "client/components/sarai-icm-corn/includes/blog-list/corn-blog-list.less",


    "client/components/sarai-icm-rice/index.html",
    "client/components/sarai-icm-rice/index.js",
    "client/components/sarai-icm-rice/route.js",
    "client/components/sarai-icm-rice/on-created.js",
    "client/components/sarai-icm-rice/includes/banner/rice-banner.html",
    "client/components/sarai-icm-rice/includes/banner/rice-banner.js",
    "client/components/sarai-icm-rice/includes/article/rice-article.html",
    "client/components/sarai-icm-rice/includes/article/rice-article.js",

    "client/components/sarai-icm-banana/index.html",
    "client/components/sarai-icm-banana/index.js",
    "client/components/sarai-icm-banana/route.js",
    "client/components/sarai-icm-banana/on-created.js",
    "client/components/sarai-icm-banana/includes/banner/banana-banner.html",
    "client/components/sarai-icm-banana/includes/banner/banana-banner.js",
    "client/components/sarai-icm-banana/includes/article/banana-article.html",
    "client/components/sarai-icm-banana/includes/article/banana-article.js",

    "client/components/sarai-icm-coconut/index.html",
    "client/components/sarai-icm-coconut/index.less",
    "client/components/sarai-icm-coconut/index.js",
    "client/components/sarai-icm-coconut/route.js",
    "client/components/sarai-icm-coconut/on-created.js",
    "client/components/sarai-icm-coconut/includes/banner/coconut-banner.html",
    "client/components/sarai-icm-coconut/includes/banner/coconut-banner.js",
    "client/components/sarai-icm-coconut/includes/article/coconut-article.html",
    "client/components/sarai-icm-coconut/includes/article/coconut-article.js",

    "client/components/sarai-icm-coffee/index.html",
    "client/components/sarai-icm-coffee/index.js",
    "client/components/sarai-icm-coffee/route.js",
    "client/components/sarai-icm-coffee/on-created.js",
    "client/components/sarai-icm-coffee/includes/banner/coffee-banner.html",
    "client/components/sarai-icm-coffee/includes/banner/coffee-banner.js",
    "client/components/sarai-icm-coffee/includes/article/coffee-article.html",
    "client/components/sarai-icm-coffee/includes/article/coffee-article.js",

    "client/components/sarai-icm-cacao/index.html",
    "client/components/sarai-icm-cacao/index.js",
    "client/components/sarai-icm-cacao/route.js",
    "client/components/sarai-icm-cacao/on-created.js",
    "client/components/sarai-icm-cacao/includes/banner/cacao-banner.html",
    "client/components/sarai-icm-cacao/includes/banner/cacao-banner.js",
    "client/components/sarai-icm-cacao/includes/article/cacao-article.html",
    "client/components/sarai-icm-cacao/includes/article/cacao-article.js",

    // ***************** Corn Pages ***************** //
    "client/components/sarai-icm-corn/includes/corn-pages/land-prep/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/land-prep/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/land-prep/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/pests-and-diseases/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/pests-and-diseases/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/pests-and-diseases/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/growth-stages/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/growth-stages/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/growth-stages/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/fertilizer/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/fertilizer/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/fertilizer/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/processing/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/processing/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/processing/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/farm-mechanization/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/farm-mechanization/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/farm-mechanization/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/food-products/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/food-products/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/food-products/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/grain-quality/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/grain-quality/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/grain-quality/route.js",

    "client/components/sarai-icm-corn/includes/corn-pages/corn-mill/index.js",
    "client/components/sarai-icm-corn/includes/corn-pages/corn-mill/index.html",
    "client/components/sarai-icm-corn/includes/corn-pages/corn-mill/route.js",

    // ***************** Coconut Pages ***************** //
    "client/components/sarai-icm-coconut/includes/coconut-pages/pollination/index.js",
    "client/components/sarai-icm-coconut/includes/coconut-pages/pollination/index.html",
    "client/components/sarai-icm-coconut/includes/coconut-pages/pollination/route.js",

    "client/components/sarai-icm-coconut/includes/coconut-pages/nut-processing/index.js",
    "client/components/sarai-icm-coconut/includes/coconut-pages/nut-processing/index.html",
    "client/components/sarai-icm-coconut/includes/coconut-pages/nut-processing/route.js",

    // ***************** Banana Pages ***************** //
    "client/components/sarai-icm-banana/includes/banana-pages/uri-ng-pananim/index.js",
    "client/components/sarai-icm-banana/includes/banana-pages/uri-ng-pananim/index.html",
    "client/components/sarai-icm-banana/includes/banana-pages/uri-ng-pananim/route.js",

    "client/components/sarai-icm-banana/includes/banana-pages/layouting/index.js",
    "client/components/sarai-icm-banana/includes/banana-pages/layouting/index.html",
    "client/components/sarai-icm-banana/includes/banana-pages/layouting/route.js",

    "client/components/sarai-icm-banana/includes/banana-pages/pag-aabono/index.js",
    "client/components/sarai-icm-banana/includes/banana-pages/pag-aabono/index.html",
    "client/components/sarai-icm-banana/includes/banana-pages/pag-aabono/route.js",

    "client/components/sarai-icm-banana/includes/banana-pages/pagpapatubig/index.js",
    "client/components/sarai-icm-banana/includes/banana-pages/pagpapatubig/index.html",
    "client/components/sarai-icm-banana/includes/banana-pages/pagpapatubig/route.js",

    "client/components/sarai-icm-banana/includes/banana-pages/pangangasiwa/index.js",
    "client/components/sarai-icm-banana/includes/banana-pages/pangangasiwa/index.html",
    "client/components/sarai-icm-banana/includes/banana-pages/pangangasiwa/route.js",

    "client/components/sarai-icm-banana/includes/banana-pages/pagtatanggal-suwi/index.js",
    "client/components/sarai-icm-banana/includes/banana-pages/pagtatanggal-suwi/index.html",
    "client/components/sarai-icm-banana/includes/banana-pages/pagtatanggal-suwi/route.js",

    "client/components/sarai-icm-banana/includes/banana-pages/pangangalaga-bunga/index.js",
    "client/components/sarai-icm-banana/includes/banana-pages/pangangalaga-bunga/index.html",
    "client/components/sarai-icm-banana/includes/banana-pages/pangangalaga-bunga/route.js",
    
    // ***************** Coffee Pages ***************** //
    "client/components/sarai-icm-coffee/includes/coffee-pages/industry/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/industry/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/industry/route.js",

    "client/components/sarai-icm-coffee/includes/coffee-pages/preparation/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/preparation/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/preparation/route.js",

    "client/components/sarai-icm-coffee/includes/coffee-pages/varieties/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/varieties/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/varieties/route.js",

    "client/components/sarai-icm-coffee/includes/coffee-pages/management-practices/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/management-practices/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/management-practices/route.js",

    "client/components/sarai-icm-coffee/includes/coffee-pages/pest-management/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/pest-management/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/pest-management/route.js",

    "client/components/sarai-icm-coffee/includes/coffee-pages/water-management/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/water-management/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/water-management/route.js",

    "client/components/sarai-icm-coffee/includes/coffee-pages/harvesting/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/harvesting/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/harvesting/route.js",

    "client/components/sarai-icm-coffee/includes/coffee-pages/processing/index.js",
    "client/components/sarai-icm-coffee/includes/coffee-pages/processing/index.html",
    "client/components/sarai-icm-coffee/includes/coffee-pages/processing/route.js",

    // ***************** Cacao Pages ***************** //
    "client/components/sarai-icm-cacao/includes/cacao-pages/industry/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/industry/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/industry/route.js",

    "client/components/sarai-icm-cacao/includes/cacao-pages/management-practices/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/management-practices/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/management-practices/route.js",

    "client/components/sarai-icm-cacao/includes/cacao-pages/pest-management/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/pest-management/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/pest-management/route.js",

    "client/components/sarai-icm-cacao/includes/cacao-pages/water-management/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/water-management/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/water-management/route.js",

    "client/components/sarai-icm-cacao/includes/cacao-pages/harvesting/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/harvesting/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/harvesting/route.js",

    "client/components/sarai-icm-cacao/includes/cacao-pages/processing/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/processing/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/processing/route.js",

    "client/components/sarai-icm-cacao/includes/cacao-pages/varieties/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/varieties/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/varieties/route.js",

    "client/components/sarai-icm-cacao/includes/cacao-pages/preparation/index.js",
    "client/components/sarai-icm-cacao/includes/cacao-pages/preparation/index.html",
    "client/components/sarai-icm-cacao/includes/cacao-pages/preparation/route.js",

    // ********************************************* //
    "client/components/sarai-icm-corn/includes/article/corn-slider.less"

  ]

  api.addFiles(client, "client")

  api.addAssets([
    "public/images/corn_banner.jpg",
    "public/images/rice_banner.jpg",
    "public/images/coconut_banner.jpg",
    "public/images/banana_banner.jpg",
    "public/images/coffee_banner.jpg",
    "public/images/cacao_banner.jpg",
    "public/images/slider_4.png",
    "public/images/cacao_article1.jpg",
    "public/images/cacao_article2.jpg",
    "public/images/coffee_article1.png",
    "public/images/coffee_article2.png",

    "public/images/corn/trivia/1.png",
    "public/images/corn/trivia/2.png",
    "public/images/corn/trivia/3.png",
    "public/images/corn/trivia/4.png",
    "public/images/corn/trivia/5.png",
    "public/images/corn/trivia/corn-ph.png",
    "public/images/corn/trivia/corn-prod.png",
    "public/images/corn/trivia/corn_production.png",

    "public/images/corn/icons/corn_processing-1.png",
    "public/images/corn/icons/farm_mechanization-1.jpg",
    "public/images/corn/icons/fertilizer-1.jpg",
    "public/images/corn/icons/growth-1.jpg",
    "public/images/corn/icons/land_preparation-1.png",
    "public/images/corn/icons/pest-1.jpg",
    "public/images/corn/icons/planting_calendar-1.png",
    "public/images/corn/icons/rainfall_distribution-1.jpg",
    "public/images/corn/icons/suitability_maps-1.png",
    "public/images/corn/icons/food_products-1.png",
    "public/images/corn/icons/grain_quality-1.png",
    "public/images/corn/icons/corn_mill-1.png",

    "public/images/coconut/icons/pollination-1.png",
    "public/images/coconut/icons/nut_processing-1.png",

    "public/images/corn/corn-nutrient-expert.png",

    "public/images/banana/icons/plantingbanana-1.png",
    "public/images/banana/icons/land_preparationbanana.png",
    "public/images/banana/icons/fertilizer.png",
    "public/images/banana/icons/watering-can-2.png",
    "public/images/banana/icons/pest-copy.png",
    "public/images/banana/icons/seedling-copy.png",
    "public/images/banana/icons/harvestingbanana.png",
    
    "public/images/banana/komiks.jpg",

    "public/images/coffee/icons/industry.png",
    "public/images/coffee/icons/preparation.png",
    "public/images/coffee/icons/varieties.png",
    "public/images/coffee/icons/management practices.png",
    "public/images/coffee/icons/pest management.png",
    "public/images/coffee/icons/watering management.png",
    "public/images/coffee/icons/harvestingcoffee.png",
    "public/images/coffee/icons/processing.png",

    "public/images/coffee/industry/figure-1-1.png",
    "public/images/coffee/industry/figure-2-1.png",
    "public/images/coffee/industry/table-1-2.png",

    "public/images/coffee/processing/figure-3.png",
    "public/images/coffee/processing/table-2.png",

    "public/images/cacao/icons/industry.png",
    "public/images/cacao/icons/preparation.png",
    "public/images/cacao/icons/varieties.png",
    "public/images/cacao/icons/management practices.png",
    "public/images/cacao/icons/pest management.png",
    "public/images/cacao/icons/water management.png",
    "public/images/cacao/icons/harvesting.png",
    "public/images/cacao/icons/processing.png",

    "public/images/cacao/industry/figure-1-2.png",
    "public/images/cacao/industry/figure-2-2.png",

    "public/images/cacao/management/Screen-Shot-2016-10-17-at-2.48.23-PM.png",
    "public/images/cacao/management/Screen-Shot-2016-10-17-at-2.49.50-PM.png",

    "public/images/cacao/processing/table-2-1.png",
    "public/images/cacao/processing/figure-3-1.png"

    ], "client")
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('sarai:sarai-icm');
});
