import React, {
  PureComponent,
} from 'react';

import PropTypes from 'prop-types';
import Field from 'src/components/Form/Field';
import styles from './styles.styl';


export default class Form extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    desc: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    id: null,
    desc: '',
  };

  render() {
    if (!this.props.data) {
      return <div className={styles.empty}>Ничего не выбрано</div>;
    }
    return (
      <form className={styles.form}>
        <Field name="id" label="Номер" value={this.props.data.id} />
        <Field name="title" label="Название" value={this.props.data.title} />
        <Field name="desc" label="Описание" value={this.props.data.desc} />
      </form>
    );
  }
}

