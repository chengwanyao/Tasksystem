interface State {

    onEnter: Function;
    onExit: Function

}

class StateMachine {

    private currentState: State;

    public changeState(nextState: State): void {
        this.currentState.onExit();
        this.currentState = nextState;
        this.currentState.onEnter();
        console.log("State change");

    }


public constructor(currentState: State) {
        this.currentState = currentState;
        this.currentState.onEnter();
        console.log("State Init");
    }


    public getState(): State {
        return this.currentState;

    }

}