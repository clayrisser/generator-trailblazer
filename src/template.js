export default {
  copy: (yo) => {
    return Promise.all([
      yo.fs.copyTpl(yo.templatePath('template/shared/config/**'), yo.destinationPath('config'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath('template/shared/test/**'), yo.destinationPath('test'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/views/docs/**'), yo.destinationPath('views/docs'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/.dockerignore'), yo.destinationPath('.dockerignore'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/.editorconfig'), yo.destinationPath('.editorconfig'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/.eslintignore'), yo.destinationPath('.eslintignore'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/.eslintrc'), yo.destinationPath('.eslintrc'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/.gitignore'), yo.destinationPath('.gitignore'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath('template/shared/Dockerfile'), yo.destinationPath('Dockerfile'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/LICENSE'), yo.destinationPath('LICENSE'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath('template/shared/README.md'), yo.destinationPath('README.md'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath('template/shared/docker-compose.yml'), yo.destinationPath('docker-compose.yml'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/index.js'), yo.destinationPath('index.js'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath('template/shared/package.json'), yo.destinationPath('package.json'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/server.js'), yo.destinationPath('server.js'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath(`template/${yo.answers.template}/api/**`), yo.destinationPath('api'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath(`template/${yo.answers.template}/config/routes.js`), yo.destinationPath('config/routes.js'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath(`database/${yo.answers.database}/config/database.js`), yo.destinationPath('config/database.js'), ...yo.context)
    ]);
  }
}
