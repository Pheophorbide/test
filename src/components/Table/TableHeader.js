import React, {
  PureComponent,
} from 'react';

import classNames from 'classnames';
import styles from './styles.styl';

export default class TableHeader extends PureComponent {

  render() {
    return (
      <thead className={styles.header}>
        <tr>
          <th className={classNames(styles.item, styles.header)}>ID</th>
          <th className={classNames(styles.item, styles.header)}>Название</th>
        </tr>
      </thead>
    );
  }
}
