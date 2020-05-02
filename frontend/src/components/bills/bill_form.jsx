import React from "react";

class BillForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.blankState();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  blankState() {
    return {
      title: "",
      amount: "",
      errors: {}
    };
  }

  // dispatch createBill and reset form state to blank if bill created successfully

  handleSubmit(e) {
    e.preventDefault();
    let bill = {
      title: this.state.title,
      amount: this.state.amount
    };
    this.props.createBill(bill).then(res => {
      if (res.type === "RECEIVE_BILL") {
        this.setState(this.blankState());
      }
      this.setState({ errors: res.errors });
    });
  }

  // onChange handler so redux state keeps track of user input

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  render() {
    return (
      <div>
        <div className="bill-form">
          Add a new bill
          <form onSubmit={this.handleSubmit}>
            <h2>What is this bill for?</h2>
            <input
              type="text"
              value={this.state.title}
              onChange={this.update("title")}
            />
            <br />
            <h2>Bill total:</h2>
            <p className='bill-form-dollar'>$</p>
            <input
              type="text"
              value={this.state.amount}
              onChange={this.update("amount")}
            />
            <button type="submit">Save this bill</button>
          </form>
        </div>
        {this.renderErrors()}
      </div>
    );
  }

  // If bill save fails validations, inserts a ul containing error messages

  renderErrors() {
    if (this.state.errors === undefined) return null;
    if (Object.keys(this.state.errors).length > 0) {
      return (
        <ul className="bill-errors">
          {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>{this.state.errors[error]}</li>
          ))}
        </ul>
      );
    }
  }
}

export default BillForm;
