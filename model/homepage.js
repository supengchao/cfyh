const AV = require('../utils/av-weapp-min.js');
class HomePage extends AV.Object {
  get imageList() {
    return this.get('imageList');
  }

  set imageList(value) {
    this.set('imageList', value);
  }

  get tabList() {
    return this.get('tabList');
  }

  set tabList(value) {
    this.set('tabList', value);
  }

  get tabNameList() {
    return this.get('tabNameList');
  }

  set tabNameList(value) {
    this.set('tabNameList', value);
  }

  get pageList() {
    return this.get('pageList');
  }

  set pageList(value) {
    this.set('pageList', value);
  }

  get houseDesc() {
    return this.get('houseDesc');
  }

  set houseDesc(value) {
    this.set('houseDesc', value);
  }
}
AV.Object.register(HomePage, 'HomePage');
module.exports = HomePage;