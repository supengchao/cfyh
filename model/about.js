const AV = require('../utils/av-weapp-min.js');
class About extends AV.Object {
  get tabList() {
    return this.get('tabList');
  }

  set tabList(value) {
    this.set('tabList', value);
  }

  get pageList() {
    return this.get('pageList');
  }

  set pageList(value) {
    this.set('pageList', value);
  }

}
AV.Object.register(About, 'About')
module.exports = About