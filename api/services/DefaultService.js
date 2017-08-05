import Service from 'trails/service';

export default class DefaultService extends Service {

  getApplicationInfo() {
    const trailpacks = [];
    Object.keys(this.app.packs).forEach(packName => {
      if (packName != 'inspect') {
        const pack = this.app.packs[packName];
        trailpacks.push({
          name: pack.name,
          version: pack.pkg.version
        });
      }
    });
    return Promise.resolve({
      app: this.app.pkg.version,
      node: process.version,
      libs: process.versions,
      trailpacks: trailpacks
    });
  }
}
