import 'normalize.css/normalize.css';
import Manager from './Application';

const manager = new Manager();
if (module.hot) {
  module.hot.accept('./Application', () => {
    manager.runApplication();
  });
}
