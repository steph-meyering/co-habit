import React from "react";
import BillItem from './bill_item';

class BillsIndex extends React.Component {
    
    componentDidMount(){
        this.props.fetchBills()
    }

    isMyBill(bill){
        if (this.props.currentUser.id === bill.user) return bill
    }

    render(){

        if (this.props.bills.length === 0) {
            return <div>No Bills Yet</div>;
        }

        if (this.props.loading) {
            debugger
            return <div>loading...</div>;
        }
        
        let billItems = this.props.bills.map(bill => (
          <BillItem
            bill={bill}
            key={bill._id}
            isMine={this.isMyBill(bill) ? true : false}
            deleteBill={this.props.deleteBill}
          />
        ));

        // let myBillItems = this.props.bills.filter((bill) => this.isMyBill(bill))
        //     .map(bill => <BillItem bill = {bill} />)

        return (
          <>
            <h3>All household bills: </h3>
            <ul>{billItems}</ul>
          </>
        );
    }
}

export default BillsIndex;