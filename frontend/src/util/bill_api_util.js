import axios from "axios";

export const createBill = bill => {
    return axios.post('/api/bills/', bill);
}    

export const getBills = () => {
    return axios.get("/api/bills");
}