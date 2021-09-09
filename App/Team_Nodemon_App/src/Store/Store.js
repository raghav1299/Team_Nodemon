import {makeAutoObservable, observable} from "mobx";

class Store {
    cart = [];
    cartButtonColorStatus = false;
    totalCartBill = "";

    constructor() {
        makeAutoObservable(this);
    }

    setCart(val) {
        this.cart = val;
    }
    setCartButtonColorStatus(val) {
        this.cartButtonColorStatus = val;
    }
    setTotalCartBill(val) {
        this.totalCartBill = val;
    }
}
export default new Store();
