import React, { Component } from './React';
import render from './render';
import Button from './Components/Button';
import Input from './Components/Input';
import List from './Components/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'test',
      listItems: ['first', 'second'],
    };
  }

  shouldComponentUpdate(nextState) {
    // console.log('nextState ', nextState);
    return true;
  }

  onSubmit = () => {
    if (this.state.value) {
      this.setState({
        listItems: [...this.state.listItems, this.state.value],
        value: '',
      });
    }
  };

  inputOnChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      React.createElement('div', {},
        <Input
          onSubmit={this.onSubmit}
          onChange={this.inputOnChange}
          value={this.state.value}
        />,
        <Button onSubmit={this.onSubmit} />,
        <List listItems={this.state.listItems} />,
      )
    );
  }
}

const appRoot = document.getElementById('root');
render(<App />, appRoot);

