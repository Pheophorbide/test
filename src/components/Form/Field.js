import React, {
  PureComponent,
} from 'react';

import styles from './styles.styl';

export default class Field extends PureComponent {
  render() {
    return (
      <div className={styles.column}>
        <label htmlFor={this.props.name} className={styles.label}>{this.props.label}</label>
        <input id={this.props.name} readOnly type="text" name={this.props.name} value={this.props.value} className={styles.input} />
      </div>
    );
  }
}
