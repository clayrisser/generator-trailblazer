import Generator from 'yeoman-generator';

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('babel');
  }

  method1() {
    this.log('method ha just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }
};
