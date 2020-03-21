import React from "react";
import BillItem from './bill_item';
import BillFormContainer from "./bill_form_container";
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
                <BillFormContainer/>
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

        // get all the names of housemates:
        let names = {};
        for (const user in this.props.housemates) {
          names[this.props.housemates[user]._id] = this.props.housemates[user].name;          
        }

        let colors = ["#E38627", "#C13C37", "#6A2135"];
        
        // sum the amount each housemate has logged
        let paidEach = {};

        for (const bill of this.props.bills) {
          if (paidEach[bill.user]){
            paidEach[bill.user] += bill.amount
          } else {
            paidEach[bill.user] = bill.amount;
          }
        }

        // shape pieData into PieChart format
        let pieData = []
        for (const name in names) {
          pieData.push(
            {title: names[name],
              value: (paidEach[name] || 0), 
              color: colors.pop()
            }
          )
        }
        return (
          <>
            <h3>All household bills: </h3>
            <PieChart
              data={pieData}
              onMouseOver={(e, propsData, dataIndex) => {
                const data = 
                (console.log(this))
              }
              }
              animate
              animationDuration={500}
              startAngle={0}
              animationEasing="ease-out"
              lineWidth={15}
              label={props => {
                return `${props.data[props.dataIndex].title} ${
                  props.data[props.dataIndex].value
                }$`;
              }}
              // label={(h)=> {
              //   return h
              // } }
              paddingAngle={5}
              labelPosition={75}
              labelStyle={{
                fill: "#121212",
                fontSize: "5px"
              }}
            />
            <ul>{billItems}</ul>
            <BillFormContainer />
          </>
        );
    }
}

export default BillsIndex;
