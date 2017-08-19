/**
 * @author: @AngularClass
 */

exports.config = {
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    'e2e/pages/**/**.feature'
  ],
  exclude: [],

  allScriptsTimeout: 110000,

  framework: 'custom',
    // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
    // Options to be passed to Cucumber.
  cucumberOpts: {
    require: [
      'e2e/pages/**/**step-definitions.js',
      'e2e/hooks/*hook.js',
    ],
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true,
  };