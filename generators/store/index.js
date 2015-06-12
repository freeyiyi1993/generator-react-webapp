var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');


module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'store',
        message: 'Name?'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      if (props.store.length > 0) {
        this.store = _.capitalize(_.camelCase(props.store.replace(/stores?$/i, ''))) + 'Store';
      }
      done();
    }.bind(this));
  },

  writing: function () {
    if (this.store) {
      var dest = path.join('src', 'stores', this.store + '.js');
      this.fs.copyTpl(
        this.templatePath('Store.js'),
        this.destinationPath(dest),
        {
          store: this.store
        }
      );
    }
  }
});
