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
      <div>
        <Input
          onSubmit={this.onSubmit}
          onChange={this.inputOnChange}
          value={this.state.value}
        />
        <Button onSubmit={this.onSubmit} />
        <List listItems={this.state.listItems} />
      </div>
    );
  }
}

const appRoot = document.getElementById('root');
render(<App />, appRoot);

