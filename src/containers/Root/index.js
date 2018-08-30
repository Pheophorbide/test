import React, {
  PureComponent,
} from 'react';
import {
  Form,
  Table,
} from 'src/components';
import { bind } from 'decko';
import data from 'src/data.json';
import styles from './styles.styl';

export default class App extends PureComponent {
  state = {
    data,
    selectedRow: null,
  };

  @bind
  onSelect(row) {
    const selectedRow = row === this.state.selectedRow ? null : row;
    this.setState({
      selectedRow,
    });
  }

  render() {
    return (<div className={styles.container}>
      <div className={styles.columnLeft}>
        <Table
          data={this.state.data}
          onSelect={this.onSelect}
          selectedRow={this.state.selectedRow}
        />
      </div>
      <div className={styles.columnRight}>
        <Form
          data={this.state.selectedRow}
        />
      </div>
    </div>);
  }
}
