import Component from '../Component';
import React from '../React';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
    this.props.onChange(this.state.value);

    if (e.keyCode === 13) {
      e.preventDefault();
      if (this.state.value) {
        this.props.onSubmit();
      }
    }
  }

  render() {
    return (
      React.createElement('input', {
        onChange: this.onChange,
        value: this.state.value,
      })
    );
  }
}

