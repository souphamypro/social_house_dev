import { Action, Reducer, Dispatch } from "redux";

export interface InitialState {
    isAuthenticated: boolean;
    session: string | null;
    walletAddress: string | null;
    email: string | null;
    walletAddressPaper: string | null;
    emailPaper: string | null;
}

export const initialState: InitialState = {
    isAuthenticated: sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== undefined && sessionStorage.getItem("token") !== "" ? true : false,
    session: sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== undefined ? sessionStorage.getItem("token") : "",
    walletAddress: sessionStorage.getItem("walletAddress") !== null && sessionStorage.getItem("walletAddress") !== undefined ? sessionStorage.getItem("walletAddress") : "",
    email: sessionStorage.getItem("email") !== null && sessionStorage.getItem("email") !== undefined && sessionStorage.getItem("email") !== "" ? sessionStorage.getItem("email") : "",
    walletAddressPaper: sessionStorage.getItem("walletAddressPaper") !== null && sessionStorage.getItem("walletAddressPaper") !== undefined ? sessionStorage.getItem("walletAddressPaper") : "",
    emailPaper: sessionStorage.getItem("emailPaper") !== null && sessionStorage.getItem("emailPaper") !== undefined && sessionStorage.getItem("emailPaper") !== "" ? sessionStorage.getItem("emailPaper") : "",
};

export interface DispatchAction extends Action {
    payload: Partial<InitialState>;
}

export enum ActionType {
    LoginSuccess,
    LogOut,
    ConnectWallet,
    DisconnectWallet,
    LoginSuccessPaper,
    LogOutPaper
}

export const authReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
    if (action.type === ActionType.LoginSuccess) {
        sessionStorage.setItem("isAuthenticated", action.payload.walletAddress || "");
        return { ...state, session: action.payload.session || null, isAuthenticated: true };
    } else if (action.type === ActionType.LogOut) {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("emailPaper");
        sessionStorage.removeItem("walletAddress");
        sessionStorage.removeItem("walletAddressPaper");
        sessionStorage.clear();
        return { ...state, isAuthenticated: false, walletAddress: "", walletAddressPaper: "", emailPaper: "" };
    } else if (action.type === ActionType.ConnectWallet) {
        sessionStorage.setItem("walletAddress", action.payload.walletAddress || "");
        return { ...state, walletAddress: action.payload.walletAddress || "" };
    } else if (action.type === ActionType.DisconnectWallet) {
        sessionStorage.removeItem("walletAddress");
        return { ...state, walletAddress: "" };
    } else if (action.type === ActionType.LoginSuccessPaper) {
        sessionStorage.setItem("emailPaper", action.payload.emailPaper || "");
        sessionStorage.setItem("walletAddressPaper", action.payload.walletAddressPaper || "");
        return { ...state, walletAddressPaper: action.payload.walletAddressPaper || "", emailPaper: action.payload.emailPaper || "" };
    } else if (action.type === ActionType.LogOutPaper) {
        sessionStorage.removeItem("emailPaper");
        sessionStorage.removeItem("walletAddressPaper");
        return { ...state, walletAddressPaper: "", emailPaper: "" };
    } else return state;
};

export class AuthDispatcher {
    private readonly dispatch: Dispatch<DispatchAction>;
    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }
    loginSuccess = (session: string) => this.dispatch({ type: ActionType.LoginSuccess, payload: { session: session } });
    logOut = () => this.dispatch({ type: ActionType.LogOut, payload: {} });
    connectWallet = (walletAddress: string) => this.dispatch({ type: ActionType.ConnectWallet, payload: { walletAddress: walletAddress } });
    disconnectWallet = () => this.dispatch({ type: ActionType.DisconnectWallet, payload: {} });
    loginSuccessPaper = (emailPaper: string, walletAddressPaper: string) => this.dispatch({ type: ActionType.LoginSuccessPaper, payload: { emailPaper: emailPaper, walletAddressPaper: walletAddressPaper } });
    logOutPaper = () => this.dispatch({ type: ActionType.LogOutPaper, payload: {} });
}