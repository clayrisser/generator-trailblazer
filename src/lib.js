import emptyDir from 'empty-dir';
import gitUserEmail from 'git-user-email';
import gitUserName from 'git-user-name';
import fs from 'fs-extra-promise';

export function isEmpty() {
  return emptyDir.sync(process.cwd());
}

export function guessEmail() {
  return gitUserEmail() || 'email@example.com';
}

export function guessUsername(email) {
  const matches = (email || guessEmail()).match(/^[^@]+/g);
  if (matches.length > 0) return matches[0];
  return 'some-username';
}

export function guessName() {
  const matches = process.cwd().match(/[^\/]+$/g);
  if (isEmpty() && matches.length > 0) return matches[0];
  return 'some-name';
}

export function guessAuthorName() {
  return gitUserName() || 'Some Name';
}

export function copy(yo) {
  return Promise.all([
    fs.mkdirsSync(yo.destinationPath('public')),
    fs.mkdirsSync(yo.destinationPath('views')),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/config/**'),
      yo.destinationPath('config'),
      { ...yo.context }
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_editorconfig'),
      yo.destinationPath('.editorconfig')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_prettierrc'),
      yo.destinationPath('.prettierrc')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_eslintrc'),
      yo.destinationPath('.eslintrc')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_gitignore'),
      yo.destinationPath('.gitignore')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/LICENSE'),
      yo.destinationPath('LICENSE')
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/README.md'),
      yo.destinationPath('README.md'),
      { ...yo.context }
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/index.js'),
      yo.destinationPath('index.js')
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/_package.json'),
      yo.destinationPath('package.json'),
      { ...yo.context }
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/server.js'),
      yo.destinationPath('server.js')
    ),
    yo.fs.copyTpl(
      yo.templatePath(`template/${yo.answers.template}/api/**`),
      yo.destinationPath('api'),
      { ...yo.context }
    ),
    yo.fs.copyTpl(
      yo.templatePath(`template/${yo.answers.template}/config/routes.js`),
      yo.destinationPath('config/routes.js'),
      { ...yo.context }
    ),
    yo.fs.copyTpl(
      yo.templatePath(`database/${yo.answers.database}/config/database.js`),
      yo.destinationPath('config/database.js'),
      { ...yo.context }
    )
  ]);
}
