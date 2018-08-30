import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from 'src/containers/Root';


export default class Application {
  constructor() {
    this.element = document.querySelector('.js-body');
    if (!this.element) {
      return;
    }

    this.runApplication();
  }

  async runApplication() {
    ReactDOM.render(<AppContainer><Root /></AppContainer>, this.element);
  }
}
