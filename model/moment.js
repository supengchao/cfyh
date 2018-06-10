const AV = require('../utils/av-weapp-min.js');

class Moment extends AV.Object {
  get nickName() {
    return this.get("nickName");
  }

  set nickName(value) {
    this.set('nickName', value);
  }

  get avatarUrl() {
    return this.get('avatarUrl');
  }

  set avatarUrl(value) {
    this.set('avatarUrl', value);
  }

  get name() {
    return this.get('name');
  }

  set name(value) {
    this.set('name', value);
  }

  get address() {
    return this.get('address');
  }

  set address(value) {
    this.set('address', value);
  }

  get latitude() {
    return this.get('latitude');
  }

  set latitude(value) {
    this.set('latitude', value);
  }

  get longitude() {
    return this.get('longitude');
  }

  set longitude(value) {
    this.set('longitude');
  }

  get content() {
    return this.get('content');
  }

  set content(value) {
    this.set('content', value);
  }

  get userId() {
    return this.get('userId');
  }

  set useId(value) {
    this.set('userId', value);
  }

  get imgStr() {
    return this.get('imgStr');
  }

  set imgStr(value) {
    this.set('imgStr', value);
  }

  get user() {
    return this.get('user');
  }

  set user(value) {
    this.set('user', value);
  }

  get imageList() {
    return this.get('imageList');
  }

  set imageList(value) {
    this.set('imageList', value);
  }

  get imgLength() {
    return this.get('imgLength');
  }

  set imgLength(value) {
    this.set('imgLength', value);
  }
}
AV.Object.register(Moment, 'Moment');
module.exports = Moment;