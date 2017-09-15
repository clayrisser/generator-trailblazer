import Model from 'trails/model';

export default class Cat extends Model {
  static config() {}

  static schema() {
    return {
      name: {
        type: 'string',
        required: true
      },
      breed: {
        type: 'string',
        required: true
      },
      birth: {
        type: 'datetime',
        required: true
      }
    };
  }
}
