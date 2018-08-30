import React, {
  PureComponent,
} from 'react';
import { bind } from 'decko';

import classNames from 'classnames';
import styles from './styles.styl';

export default class Row extends PureComponent {
  @bind
  onClick() {
   this.props.onSelect(this.props.data);
  }

  render() {
    return (
      <tr
        className={
          classNames(
            styles.row,
            { [styles.active]: this.props.isSelected },
          )
        }
        onClick={this.onClick}
      >
        <td className={classNames(styles.item, styles.bold)}>{ this.props.data.id }</td>
        <td className={styles.item}>{ this.props.data.title }</td>
      </tr>
    );
  }
}
