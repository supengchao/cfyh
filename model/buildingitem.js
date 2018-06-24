const AV = require('../utils/av-weapp-min.js');
class BuildingItem extends AV.Object {
  get title() {
    return this.get('title');
  }

  set title(value) {
    this.set('title', value);
  }
  get image() {
    return this.get('image');
  }

  set image(value) {
    this.set('image', value);
  }
}
AV.Object.register(BuildingItem, 'BuildingItem')
module.exports = BuildingItem