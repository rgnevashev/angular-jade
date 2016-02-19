var minify = Npm.require('html-minifier').minify;
var jade = Npm.require('jade');
var path = Npm.require('path');
var s = Npm.require("underscore.string");
var inflector = Npm.require('inflection');
var jadeOpts = {pretty: true, compileDebug: false};

Plugin.registerSourceHandler('ng.jade', {
  isTemplate: true,
  archMatching: 'web'
}, function(compileStep) {

  var contents = compileStep.read().toString('utf8');
  contents = jade.compile(contents, jadeOpts)();

  var newPath = path.normalize(compileStep.inputPath);
  newPath = path.basename(newPath, '.ng.jade');
  newPath = s(newPath).trim().classify().value();

  var results = 'angular.module(\'angular-meteor\').run([\'$templateCache\', function($templateCache) {' +
    '$templateCache.put(' + JSON.stringify(newPath) + ', ' +
      JSON.stringify(minify(contents, {
        collapseWhitespace : true,
        conservativeCollapse : true,
        removeComments : true,
        minifyJS : true,
        minifyCSS: true,
        processScripts : ['text/ng-template']
      })) + ');' +
    '}]);';

  compileStep.addJavaScript({
    path : compileStep.inputPath.replace(".ng.jade", ".html.js"),
    data : results,
    sourcePath : compileStep.inputPath
  });
});