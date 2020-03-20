import React from "react";
import BillItem from './bill_item';
import BillForm from "./bill_form";

class BillsIndex extends React.Component {
    
    componentDidMount(){
        this.props.fetchBills()
        this.props.getAcceptedUsers(this.props.currentUser.household);
    }

    isMyBill(bill){
        if (this.props.currentUser.id === bill.user) return bill
    }

    render(){

        if (this.props.bills.length === 0) {
            return (
              <div>
                <div>No Bills Yet</div>
                <BillForm/>
              </div>
            );
        }

        if (this.props.loading) {
            return <div>loading...</div>;
        }
        let billItems = this.props.bills.map(bill => {
            return (
              <BillItem
                bill={bill}
                key={bill._id}
                isMine={this.isMyBill(bill) ? true : false}
                deleteBill={this.props.deleteBill}
                updateBill={this.props.updateBill}
                owner={this.props.housemates[bill.user].name}
              />
            );});

        // let myBillItems = this.props.bills.filter((bill) => this.isMyBill(bill))
        //     .map(bill => <BillItem bill = {bill} />)

        return (
          <>
            <h3>All household bills: </h3>
            <ul>{billItems}</ul>
            <BillForm />
          </>
        );
    }
}

export default BillsIndex;