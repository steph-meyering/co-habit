import React from "react";
import BillItem from './bill_item';
import BillForm from "./bill_form";
import PieChart from "react-minimal-pie-chart";

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
        // let names = this.props.housemates.keys(person => person.name)
        let names = []
        for (const user in this.props.housemates) {
          names.push({title: this.props.housemates[user].name});            
        }
        debugger
        return (
          <>
            <h3>All household bills: </h3>
            <ul>{billItems}</ul>
            <BillForm />
            <PieChart
              data={[
                { title: "One", value: 10, color: "#E38627" },
                { title: "Two", value: 15, color: "#C13C37" },
                { title: "Three", value: 20, color: "#6A2135" }
              ]}
            />
            ;
          </>
        );
    }
}

export default BillsIndex;
