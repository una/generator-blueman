'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var BluemanGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

      // this.log(this.yeoman);

      this.log("\n" + chalk.blue("HI" + "this is where ascii art goes"));

      this.log(chalk.cyan("\nGenerate a Bluemix app with the Blueman generator!"));
      this.log(chalk.yellow("First, tell us a little bit about your project »"));


    // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Generate a Bluemix app with the Blueman generator!'
    // ));

  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someOption',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];

  //   this.prompt(prompts, function (props) {
  //     this.someOption = props.someOption;

  //     done();
  //   }.bind(this));
  // },

    var prompts = [{
      name: "projectName",
      message: "What is the name of your project?"
    }, {
      name: "projectDescription",
      message: "Describe your project for me:"
    }, {
      name: "projectTagline",
      message: "What is the tagline for your project?"
    }, {
      name: "projectURL",
      message: "What will the URL for your project be " + chalk.magenta("(format: myapp.mybluemix.net)?")
    }];

    this.prompt(prompts, function (props) {
      this.projectName        = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectTagline     = props.projectTagline;
      this.projectURL         = props.projectURL;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('public');
      this.dest.mkdir('public/css');

      this.src.copy('_index.html', 'index.html');
      this.src.copy('_package.json', 'package.json');
      // this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = BluemanGenerator;
