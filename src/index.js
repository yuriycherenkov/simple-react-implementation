import Component from './Component';
import React from './React';
import { render } from './render';

import Button from './Components/Button';
import Input from './Components/Input';
import List from './Components/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'test',
      listItems: [
        'first',
        'second',
      ],
    };
  }

  shouldComponentUpdate(nextState) {
    // console.log('nextState ', nextState);
    return true;
  }

  onChange = (value) => {
    this.setState({ value });
  };

  onSubmit = () => {
    if (this.state.value) {
      this.setState({
        listItems: [...this.state.listItems, this.state.value],
        value: '',
      });
    }
  };

  render() {
    return (
      React.createElement('div', { },
        React.createElement(Input,
          { onSubmit: this.onSubmit,
            onChange: this.onChange,
            value: this.state.value,
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
render(React.createElement(App), appRoot);

