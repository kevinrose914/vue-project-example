import Vue from 'vue';

Vue.filter('hide-phone-str', (value) => {
  const val = typeof value === 'string' ? value : value.toString();
  const before = val.substr(0, 3);
  const after = val.substr(-3, 3);
  return `${before}****${after}`;
});
