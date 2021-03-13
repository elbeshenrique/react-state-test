export class State {
    constructor() {
        if (new.target === State) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }
}

export class StartState extends State {
}

export class LoadingState extends State {
}

export class SuccessState extends State {
    list = [];

    constructor(list) {
        super();
        this.list = list;
    }
}

export class ErrorState extends State {
    error = "";

    constructor(error) {
        super();
        this.error = error;
    }
}