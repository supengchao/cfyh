const AV = require('../utils/av-weapp-min.js');
class Building extends AV.Object {
  
  get imageList() {
    return this.get('imageList');
  }

  set imageList(value) {
    this.set('imageList', value);
  }

  get buildingNo() {
    return this.get('buildingNo');
  }

  set buildingNo(value) {
    this.set('buildingNo', value);
  }

}
AV.Object.register(Building, 'Building')
module.exports = Building