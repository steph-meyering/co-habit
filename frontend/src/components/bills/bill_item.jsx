import React from "react";
import BillUpdateForm from "./bill_update_form";

class BillItem extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			showUpdateForm: false
		};    
		
		this.closeUpdateForm = this.closeUpdateForm.bind(this)
	}
	  
	closeUpdateForm() {
    	this.setState({showUpdateForm: false})
  	}

    render(){
    if (this.props.bill._id === "undefined") return null
		if (this.state.showUpdateForm){
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
            <li className='bill-title'>{this.props.bill.title}</li>
            <li>Added by: {this.props.owner}</li>
            <li>${this.props.bill.amount}</li>
            <li>
              {this.props.isMine ? (
                <div>
                  <button
                    onClick={() => this.setState({ showUpdateForm: true })}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => this.props.deleteBill(this.props.bill)}
                  >
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