import { makeAutoObservable, observable } from "mobx";



class Store {
    fcmToken = [];

    constructor() {
        makeAutoObservable(this);
    }

    setFcmToken(val) {
        this.fcmToken = val;
    }
}
export default new Store();