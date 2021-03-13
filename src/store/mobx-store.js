import { makeAutoObservable } from 'mobx';
import { StartState, LoadingState, ErrorState, SuccessState } from '../states/states';
import Axios from 'axios';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const singleton = Symbol();
const singletonEnforcer = Symbol();

export class Store {
    state = new StartState();
    count = 0;

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error("Cannot construct singleton");
        }

        makeAutoObservable(this);
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Store(singletonEnforcer);
        }

        return this[singleton];
    }

    setState(state) {
        this.state = state;
    }

    increment() {
        this.count++;
    }

    alterar() {
        this.state.list[0].id = Math.trunc(Math.random() * 10000);
        this.state = new SuccessState(this.state.list);
    }

    async loadData() {
        try {
            await sleep(200);
            this.setState(new LoadingState());

            await sleep(1000);
            //throw null;

            const response = await Axios.get('https://602eb1694410730017c51276.mockapi.io/person');
            if (response.status === 200) {
                const data = response.data;
                this.setState(new SuccessState(data));
            }
        } catch (ex) {
            this.setState(new ErrorState(ex));
        }
    }
}

export default Store;