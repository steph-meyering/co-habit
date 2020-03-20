import React from "react";

class BillUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.bill
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    update(field) {
        return e => {
            this.setState({
                [field]: e.currentTarget.value
            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props
          .updateBill(this.state)
          .then(() => this.props.closeUpdateForm());
    }
    
    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <h2>What is this bill for?</h2>
              <input
                type="text"
                value={this.state.title}
                onChange={this.update("title")}
              />
              <br />
              <h2>Bill total:</h2>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.update("amount")}
              />
              <button type="submit">SAVE</button>
              <button onClick={() => this.props.closeUpdateForm()}>CANCEL</button>
            </form>
          </div>
        );
    }
}

export default BillUpdateForm;