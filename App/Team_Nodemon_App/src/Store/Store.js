import {makeAutoObservable, observable} from "mobx";

class Store {
    cart = [];
    cartButtonColorStatus = false;
    totalCartBill = "";
    usernameVal = "";
    authTokenVal = 0;
    fcmToken = "";
    isLoadingCheckout = false;
    paymentStatus = false;

    paymentShowStatus = "";

    constructor() {
        makeAutoObservable(this);
    }

    setCart(val) {
        this.cart = val;
    }
    setAuthTokenVal(val) {
        this.authTokenVal = val;
    }
    setLoadingCheckout(val) {
        this.isLoadingCheckout = val;
    }
    setPaymentStatus(val) {
        this.paymentStatus = val;
    }
    setShowPaymentStatus(val) {
        this.paymentShowStatus = val;
    }
    setCartButtonColorStatus(val) {
        this.cartButtonColorStatus = val;
    }
    setTotalCartBill(val) {
        this.totalCartBill = val;
    }
    setUsernameVal(val) {
        this.usernameVal = val;
    }
    setFcmToken(val) {
        this.fcmToken = val;
    }
}
export default new Store();
