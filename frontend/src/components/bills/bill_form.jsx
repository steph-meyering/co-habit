import React from 'react';

class BillForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.defaultState()

    this.handleSubmit = this.handleSubmit.bind(this);
    this.defaultState = this.defaultState.bind(this);

  }

  defaultState(){
    return {
      title: "",
      amount: "",
      errors: {}
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();

    let bill = {
        title: this.state.title,
        amount: this.state.amount
    };
    this.props.createBill(bill).then(
      this.setState(this.defaultState()))
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>What is this bill for?</h2>
          <input 
            type="text" 
            value={this.state.title} 
            onChange={this.update('title')}/>
          <br />
          <h2>Bill total:</h2>
          <input 
            type="text" 
            value={this.state.amount} 
            onChange={this.update('amount')}/>
          <button type="submit">Save this bill</button>
        </form>
      </div>
    );
  }
}

export default BillForm;