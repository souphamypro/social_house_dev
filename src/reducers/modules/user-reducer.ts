import { Action, Reducer, Dispatch } from "redux";

export interface InitialState {
    isAuthenticated: boolean;
    email: string;
}

export const initialState: InitialState = {
    isAuthenticated: sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== undefined && sessionStorage.getItem("token") !== "" ? true : false,
    email: '',
};

export interface DispatchAction extends Action {
    payload: Partial<InitialState>;
}

export enum ActionType {
    LoginSuccess,
    LogOut,
}

export const authReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
    if (action.type === ActionType.LoginSuccess) {
        return { ...state, isAuthenticated: action.payload.isAuthenticated || false };
    } else if (action.type === ActionType.LogOut) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        return { ...state, isAuthenticated: false };
    } else return state;
};

export class AuthDispatcher {
    private readonly dispatch: Dispatch<DispatchAction>;
    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }
    loginSuccess = (isAuthenticated: boolean) => this.dispatch({ type: ActionType.LoginSuccess, payload: { isAuthenticated: isAuthenticated } });
    logOut = () => this.dispatch({ type: ActionType.LogOut, payload: {} });
}