import React from "react";

class BillItem extends React.Component {
    render(){
      if (this.props.bill._id === "undefined") return null
        return (
          <div>
            <li>{this.props.bill.title}</li>
            <li>${this.props.bill.amount}</li>
            <li>{this.props.isMine ? 
              <button onClick={() => this.props.deleteBill(this.props.bill)}>DELETE</button> 
              : 'not mine'}
            </li>
            <br />
          </div>
        );
    }
}

export default BillItem;