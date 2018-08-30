import React, {
  PureComponent,
} from 'react';

import TableHeader from 'src/components/Table/TableHeader';
import Row from 'src/components/Table/Row';
import styles from './styles.styl';

export default class Table extends PureComponent {
  render() {
    return (
      <table className={styles.table}>
        <TableHeader />
        <tbody>
          {this.props.data.map(row => <Row isSelected={this.props.selectedRow === row} data={row} key={row.id} onSelect={this.props.onSelect} />)}
        </tbody>
      </table>
    );
  }
}
