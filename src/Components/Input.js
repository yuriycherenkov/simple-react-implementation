import Component from '../Component';
import React from '../React';

export default class Input extends Component {
  onChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);

    if (e.keyCode === 13) {
      e.preventDefault();
      if (value) {
        this.props.onSubmit(value);
      }
    }
  }

  render() {
    return (
      React.createElement('input', {
        onChange: this.onChange,
        value: this.props.value,
      })
    );
  }
}

