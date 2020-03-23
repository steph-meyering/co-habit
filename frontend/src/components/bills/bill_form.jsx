import React from 'react';


class BillForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      amount: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  
  handleSubmit(e) {
    e.preventDefault();
    let bill = {
      title: this.state.title,
      amount: this.state.amount
    };
    this.props.createBill(bill)
      .then(res => {
        this.setState({errors: res.errors})
      })
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }
  
  renderErrors() {
    if (this.state.errors === undefined) return null
    if (Object.keys(this.state.errors).length > 0){
      return (
        <ul className='bill-errors'>
          {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>
              {this.state.errors[error]}
            </li>
          ))}
        </ul>
      );
    }
  }
  
  render() {
    return (
      <div>
        <div className='bill-form'>Add a new bill
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
        {this.renderErrors()}
      </div>
    );
  }
}

export default BillForm;