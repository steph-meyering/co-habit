import React from "react";

class BillItem extends React.Component {
    render(){
        debugger
        return(
            <div>
                <li>{this.props.bill.title}</li>
            </div>
        )
    }
}

export default BillItem;