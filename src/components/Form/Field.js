import React, {
  PureComponent,
} from 'react';
import { bind } from 'decko';
import styles from './styles.styl';

export default class Field extends PureComponent {
  @bind
  onChange({ target }) {
    this.props.onChange(target.value);
  }

  render() {
    return (
      <div className={styles.column}>
        <label
          htmlFor={this.props.name}
          className={styles.label}
        >
          {this.props.label}
        </label>
        <input
          id={this.props.name}
          onChange={this.onChange}
          type="text"
          name={this.props.name}
          value={this.props.value}
          className={styles.input}
        />
      </div>
    );
  }
}
