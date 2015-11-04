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
      this.dest.mkdir('scss');
      this.dest.mkdir('img');
      this.dest.mkdir('js');
      this.dest.mkdir('public/css');

      // files being templated
      this.template('index.html', 'index.html');
      this.template('_manifest.yml', 'manifest.yml');
      this.copy('gulpfile.js', 'gulpfile.js');

      //files being copied over
      this.copy('_package.json', 'package.json');
      this.copy('_bower.json', 'bower.json');
      this.copy('app.js', 'app.js');
      this.copy('scss/main.scss', 'scss/main.scss');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
      this.copy('.cfignore', '.cfignore');
    }
  },

  end: function () {
    var spawnSync = require('child_process').spawnSync;

    spawnSync('npm', ['install'], {stdio: 'inherit'});
    spawnSync('cf', ['login'], {stdio: 'inherit'});
  }
});

module.exports = BluemanGenerator;
