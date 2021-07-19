import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit =  this.props.onSubmit;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.onSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter game id:
          <br/>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br/>
        <br/>
        <input type="submit" value="Join game" />
      </form>
    );
  }
}

export {Form}
