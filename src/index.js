import Generator from 'yeoman-generator';
import _ from 'lodash';

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.context = {};
  }

  initializing() {
    if (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') {
      this.destinationRoot('demo');
    }
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project Description:'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project Version:'
      }
    ]).then((answers) => {
      this.answers = answers;
      this.context = {...this.context, ...this.answers};
      this.log('Name:', answers.name);
    });
  }

  configuring() {}

  default() {}

  writing() {
    return Promise.all([
      this.fs.copyTpl(this.templatePath('core/api/*/**'), this.destinationPath('api'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/config/*/**'), this.destinationPath('config'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/test/*/**'), this.destinationPath('test'), ...this.context),
      this.fs.copy(this.templatePath('core/views/docs/*/**'), this.destinationPath('views/docs'), ...this.context),
      this.fs.copy(this.templatePath('core/.dockerignore'), this.destinationPath('.dockerignore'), ...this.context),
      this.fs.copy(this.templatePath('core/.editorconfig'), this.destinationPath('.editorconfig'), ...this.context),
      this.fs.copy(this.templatePath('core/.eslintignore'), this.destinationPath('.eslintignore'), ...this.context),
      this.fs.copy(this.templatePath('core/.eslintrc'), this.destinationPath('.eslintrc'), ...this.context),
      this.fs.copy(this.templatePath('core/.gitignore'), this.destinationPath('.gitignore'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/Dockerfile'), this.destinationPath('Dockerfile'), ...this.context),
      this.fs.copy(this.templatePath('core/LICENSE'), this.destinationPath('LICENSE'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/README.md'), this.destinationPath('README.md'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/docker-compose.yml'), this.destinationPath('docker-compose.yml'), ...this.context),
      this.fs.copy(this.templatePath('core/index.js'), this.destinationPath('index.js'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/package.json'), this.destinationPath('package.json'), ...this.context),
      this.fs.copy(this.templatePath('core/server.js'), this.destinationPath('server.js'), ...this.context),
      this.fs.copy(this.templatePath('core/yarn.lock'), this.destinationPath('yarn.lock'), ...this.context)
    ]);
  }

  conflicts() {}

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {}
};
