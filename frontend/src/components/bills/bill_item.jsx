import React from "react";
import BillUpdateForm from "./bill_update_form";

class BillItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // local state keeps track of whether bill edit form is displayed or not
      showUpdateForm: false
    };

    this.closeUpdateForm = this.closeUpdateForm.bind(this);
  }

  closeUpdateForm() {
    this.setState({ showUpdateForm: false });
  }

  render() {
    if (this.props.bill._id === "undefined") return null;

    if (this.state.showUpdateForm) {
      // thread in bill data, and necessary methods to save edited bill and close edit form
      return (
        <BillUpdateForm
          updateBill={this.props.updateBill}
          bill={this.props.bill}
          closeUpdateForm={this.closeUpdateForm}
        />
      );
    }

    return (
      <div className="bill">
        <li className="bill-title">{this.props.bill.title}</li>
        <li>Added by: {this.props.owner}</li>
        <li>${this.props.bill.amount}</li>
        <li>
          {/* If bill was added by current / logged in user, add edit & update buttons */}
          {this.props.isMine ? (
            <div>
              <button onClick={() => this.setState({ showUpdateForm: true })}>
                EDIT
              </button>
              <button onClick={() => this.props.deleteBill(this.props.bill)}>
                DELETE
              </button>
            </div>
          ) : null}
        </li>
      </div>
    );
  }
}

export default BillItem;
