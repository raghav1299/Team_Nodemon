import {makeAutoObservable, observable} from "mobx";

class Store {
    cart = [];
    cartButtonColorStatus = false;

    constructor() {
        makeAutoObservable(this);
    }

    setCart(val) {
        this.cart = val;
    }
    setCartButtonColorStatus(val) {
        this.cartButtonColorStatus = val;
    }
}
export default new Store();
