'use strict';
var yeoman = require('yeoman-generator');
var shelljs = require('shelljs');
var chalk = require('chalk');

var BluemanGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    // requires cloudfoundry
    var dependenciesInstalled = ['cf'].every(function (depend) {
      return shelljs.which(depend);
    });

    if (!dependenciesInstalled) {
      this.log('MISSING DEPENDENCIES:' +
        '\n' + chalk.yellow('Cloud Foundry') + ' is not installed or missing from $PATH.');
      shelljs.exit(1);
    }
  },

  prompting: function () {
    var done = this.async();

      // this.log(this.yeoman);

      this.log('\n' + chalk.blue('                                                                                          \n                             .::::::::::-                                                 \n                            -oooooooooooo:                                                \n                           :oooooooooooooo\x2F                                               \n                          \x2Foooooooooooooooo+`                                             \n                         :++++++++++ooooooooo`                                            \n            `oyyyyyyyyoo\x2F:++oooooooo++oooooo+`                                            \n           `syyyyyyysoyy+s+o+++ooooooo\x2F+ooo\x2F   .+++++.\x2F+++++\x2F:  ++++:   :++++             \n          .yyyyyyyysoyyy+yy\x2Fooo++++oooo\x2Foo:    .\x2F+++\x2F.\x2F++++\x2F+++`\x2F++++. .+++++             \n         :yyyyyyyyy+yyyy+yyy+oooooo+++oo\x2F-       oy+   .yy\x2F:\x2Fyo` -yyys.syyy:              \n        .yyyyyyyyyy+yyyy+yyyy:++++++++::.        +s\x2F   .ssssss-  -ss:sss:ss-              \n         -yyyyyyyyy+yyyy+yyy\x2F+ooooo++++o\x2F-       :+:   `++` .++. .+\x2F :+: \x2F+.              \n          .syyyyyyyy+yyy+ys\x2Fooo++++oooo\x2Foo:    -sssss-osssssss+`ssss `o` ssss`..`         \n           `oyyyyyyysoyy+s\x2F++++oooooo+\x2Foooo\x2F   `-----`.------`  ----  `  ----             \n             +yyyyyyyyoo::++ooooooo+\x2F+oooooo+`                                            \n                         :+++++++++ooooooooo+.                                            \n                          \x2Foooooooooooooooo+`                                             \n                           :oooooooooooooo\x2F                                               \n                            -oooooooooooo:                                                \n                             .::::::::::-                                                 \n'));

      this.log(chalk.cyan('\n Generate a Bluemix app with the Blueman generator!'));
      this.log(chalk.yellow('\n Please tell us a little bit about your project »'));

    var prompts = [{
      name: 'authorName',
      message: 'What is your name?'
    }, {
      name: 'projectName',
      message: 'What is the name of your project?'
    }, {
      name: 'projectDescription',
      message: 'Describe your project for me:'
    }, {
      name: 'projectURL',
      message: 'What will the subdomain for your project be? ' + chalk.magenta('(do not include mybluemix.net)')
    }];

    this.prompt(prompts, function (props) {
      this.authorName         = props.authorName;
      this.projectName        = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectURL         = props.projectURL;

      done();
    }.bind(this));
  },

  writing: {

    app: function () {
      // folders being made
      this.dest.mkdir('public');
      this.dest.mkdir('public/css');
      this.dest.mkdir('public/img');
      this.dest.mkdir('public/js');

      // files being templated
      this.template('public/index.html', 'public/index.html'); //why aren't we putting this in public/index.html?
      this.template('_manifest.yml', 'manifest.yml');

      //files being copied over
      this.copy('_package.json', 'package.json');
      this.copy('_bower.json', 'bower.json');
      this.copy('app.js', 'app.js');
      this.copy('public/css/main.css', 'public/css/main.css');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
      this.copy('.cfignore', '.cfignore');
      this.copy('gulpfile.js', 'gulpfile.js');
    }
  },

  end: function () {
    this.installDependencies();
    // // http://nodejs.org/api.html#_child_processes
    // var sys = require('sys');
    // var exec = require('child_process').exec;
    // var child;

    // // executes `cf login`
    // child = exec("cf login", function (error, stdout, stderr) {
    //   sys.print('stdout: ' + stdout);
    //   sys.print('stderr: ' + stderr);
    //   if (error !== null) {
    //     console.log('exec error: ' + error);
    //   }
    // });
  }
});

module.exports = BluemanGenerator;
