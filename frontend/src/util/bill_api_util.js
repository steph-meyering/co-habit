import axios from "axios";

export const createBill = bill => {
    debugger
    return axios.post('/api/bills/', bill);
}    

export const getBills = () => {
    debugger
    return axios.get("/api/bills");
}