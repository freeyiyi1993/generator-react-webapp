var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var _ = require('lodash');


const Base = path.join('src', 'actions');


module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'action',
        message: 'Name?'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      if (props.action.length > 0) {
        this.action = _.capitalize(_.camelCase(props.action.replace(/actions?$/i, ''))) + 'Actions';
      }
      done();
    }.bind(this));
  },

  writing: function () {
    if (this.action) {
      // create the action itself
      var dest = path.join(Base, this.action + '.js');
      this.fs.copyTpl(
        this.templatePath('Actions.js'),
        this.destinationPath(dest),
        {
          action: this.action
        }
      );

      // export the action via index.js
      var index = this.destinationPath(path.join('src', 'actions', 'index.js'));

      if (this.fs.exists(index)) {

        var content = this.read(index);
        var insert = 'module.exports = require(\'./' + this.action +  '\');';
        if (content.indexOf(insert) === -1) {
          this.write(index, content.replace(content, content + '\n' + insert));
        }

      } else {

        this.conflicter.force = true;
        this.fs.copyTpl(
          this.templatePath('index.js'),
          index,
          { action: this.action }
        );

      }
    }
  }
});
