Package.describe({
  name: 'rgnevashev:angular-jade',
  version: '1.11.0',
  summary: 'Compile Jade templates for use in meteor-angular.',
  git: 'https://github.com/rgnevashev/angular-jade.git',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compileJadeAngular",
  sources: [
    'plugin.js'
  ],
  npmDependencies : {
    'inflection': '1.8.0',
    'underscore.string': '3.2.3',
    'html-minifier': '1.1.1',
    'jade': '1.11.0'
  }
});
