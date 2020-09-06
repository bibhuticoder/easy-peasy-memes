import Vue from 'vue';
import Extension from './Extension.vue';

var initUi = (config) => {
  // pass necessary data to Vue(Element is removed later)
  let div = document.createElement('div');
  div.setAttribute('id', '_easy_peasy_memes');
  div.setAttribute('data-image', config.image);
  div.setAttribute('data-app-type', config.action);
  document.body.appendChild(div);

  new Vue({
    el: '#app',
    render: h => h(Extension)
  });
}

chrome.storage.local.get(['action', 'image'], initUi);

