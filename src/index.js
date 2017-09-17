import Generator from 'yeoman-generator';
import _ from 'lodash';
import moment from 'moment';
import optionOrPrompt from 'yeoman-option-or-prompt';

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    if (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'true') {
      this.destinationRoot('demo');
    }
    this.context = {
      date: moment().format('YYYY-MM-DD'),
      year: moment().format('YYYY')
    };
    this.optionOrPrompt = optionOrPrompt;
  }

  prompting() {
    return this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: 'some-name'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project Description:',
        default: 'some-description'
      },
      {
        type: 'input',
        name: 'productVersion',
        message: 'Project Version:',
        default: 'some-product-version'
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Git Repo:',
        default: 'some-repo'
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author Name:',
        default: 'some-author-name'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email:',
        default: 'some-author-email'
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL:',
        default: 'some-author-url'
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage:',
        default: 'some-homepage'
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
      this.fs.copyTpl(this.templatePath('core/api/**'), this.destinationPath('api'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/config/**'), this.destinationPath('config'), ...this.context),
      this.fs.copyTpl(this.templatePath('core/test/**'), this.destinationPath('test'), ...this.context),
      this.fs.copy(this.templatePath('core/views/docs/**'), this.destinationPath('views/docs'), ...this.context),
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
      this.fs.copy(this.templatePath('core/server.js'), this.destinationPath('server.js'), ...this.context)
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
