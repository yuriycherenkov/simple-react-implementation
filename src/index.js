import Component from './Component';
import React from './React';
import { render } from './render';

import Button from './Components/Button';
import Input from './Components/Input';
import List from './Components/List';

class App extends Component {
  constructor(id, props) {
    super(id, props);
    this.state = {
      value: 'test',
      listItems: [
        'first',
        'second',
      ],
    };
  }

  onChange = (value) => {
    this.setState({ value });
  };

  onSubmit = () => {
    this.setState({
      listItems: [...this.state.listItems, this.state.value],
      value: '',
    });
    console.log('submit', this.state);
  };

  render() {
    return (
      React.createElement('div', { },
        React.createElement(Input,
          { onSubmit: this.onSubmit,
            value: this.state.value,
            onChange: this.onChange,
          }),
        React.createElement(Button, {
          onSubmit: this.onSubmit,
        }),
        React.createElement(List, {
          listItems: this.state.listItems,
        }),
      )
    );
  }

}

const appRoot = document.getElementById('root');

render(App, appRoot);

