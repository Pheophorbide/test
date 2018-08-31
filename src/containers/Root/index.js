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

  @bind
  onRowChange(rowId, rowData) {
    const selectedRowIndex = this.state.data.findIndex(({ id }) => id === rowId);
    const data = [...this.state.data];
    data[selectedRowIndex] = {
      ...data[selectedRowIndex],
      ...rowData,
    };

    this.setState({
      data,
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
        <h1 className={styles.title}>Информация о записи</h1>
        <Form
          data={this.state.selectedRow}
          onRowChange={this.onRowChange}
        />
      </div>
    </div>);
  }
}
