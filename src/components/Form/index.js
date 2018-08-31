import React, {
  PureComponent,
} from 'react';
import { bind } from 'decko';
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

  static getDerivedStateFromProps(props, state) {
    if (props.data === state.data) {
      return {};
    }

    if (!props.data) {
      return {
        data: null,
        id: '',
        title: '',
        desc: '',
      };
    }

    return {
      data: props.data,
      id: props.data.id,
      title: props.data.title,
      desc: props.data.desc,
    };
  }

  state = {
    data: null,
    id: '',
    title: '',
    desc: '',
  };

  @bind
  onTitleChange(title) {
    this.setState({
      title,
    });
  }

  @bind
  onSubmit(event) {
    event.preventDefault();
    const {
      data,
      ...rowData
    } = this.state;
    this.props.onRowChange(this.state.data.id, rowData);
  }

  render() {
    if (!this.props.data) {
      return <div className={styles.empty}>Ничего не выбрано</div>;
    }

    return (
      <form
        className={styles.form}
        onSubmit={this.onSubmit}
      >
        <Field name="id" label="Номер" value={this.state.id} />
        <Field name="title" label="Название" value={this.state.title} onChange={this.onTitleChange} />
        <Field name="desc" label="Описание" value={this.props.data.desc} />
        <button type="submit">SUBMIT</button>
      </form>
    );
  }
}

