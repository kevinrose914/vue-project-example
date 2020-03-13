/* eslint-disable */
import Vue from 'vue';
import container from './index.vue';

const containerConstructor = Vue.extend(container);
const cache = []; // 缓存实例
const getComponentInstance = (constructor) => {
	if (cache.length > 0) {
		let instance = cache[0];
		cache.splice(0, 1);
		return instance;
	}
	return new constructor({
    el: document.createElement('div')
	});
};
let cacheInstance = (instance) => {
  if (instance) {
    cache.push(instance);
  }
};
let removeContainerDom = (e) => {
    if (e.target.parentNode) {
      e.target.parentNode.removeChild(e.target);
    }
};
containerConstructor.prototype.close = function(...args) {
    this.$el.addEventListener('transitionend', removeContainerDom);
    this.visible = false;
    this.closed = true;
    cacheInstance(this);
    if (this.closeCallback) {
        this.closeCallback(...args);
    }
};
function showDialog(object) {
    const containerInstance = getComponentInstance(containerConstructor);
    const { data, config } = object;
    // 将需要传给自定义组件的数据传入
    for(let i in data) {
      containerInstance[i] = data[i];
    }
    containerInstance.closed = false;
    containerInstance.duration = config ? config.duration : 0; 
    containerInstance.maskCloseDialog = config ? config.maskCloseDialog : false;
    containerInstance.closeCallback = config ? config.closeCallback : null;
    clearTimeout(containerInstance.timer);
    document.body.appendChild(containerInstance.$el);

    Vue.nextTick(() => {
        containerInstance.visible = true;
        containerInstance.$el.removeEventListener('transitionend', removeContainerDom);
        const { duration } = containerInstance;
        if (duration && duration > 0) {
            containerInstance.timer = setTimeout(() => {
              if (containerInstance.closed) {
                return;
              }
              containerInstance.close();
            }, duration);
          }
    });

    return containerInstance;
}

function messageBox() {
    Vue.prototype.$messageBox = showDialog;
}

export default messageBox;