exports.config = {
  bundles: [
    { components: ['app-root', 'login-page', 'signup-page', 'ionic-chat', 'add-room'] }
  ],
  collections: [{ name: '@stencil/router' }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
