'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path  = require('path');


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('React.js')
    ));

    var root = this.destinationRoot();

    var prompts = [
      {
        name: 'appName',
        message: 'What\'s the name of your web app?',
        default: path.basename(root)
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          appName: this.appName
        }
      );

      this.fs.copy(
        this.templatePath('etc'),
        this.destinationPath('etc')
      );

      this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    }
  },

  install: function () {
    this.npmInstall([
      'alt',
      'debug',
      'es6-shim',
      'react',
      'react-router',
      'whatwg-fetch'
    ], {
      'save': true
    });

    this.npmInstall([
      'autoprefixer-loader',
      'babel-core',
      'babel-loader',
      'css-loader',
      'file-loader',
      'html-webpack-plugin',
      'node-libs-browser',
      'react-hot-loader',
      'style-loader',
      'webpack',
      'webpack-dev-server'
    ], {
      'saveDev': true
    });
  }
});
