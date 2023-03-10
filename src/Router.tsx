import React, { FC } from 'react';
import { Routes, Route, HashRouter, Outlet, Navigate } from 'react-router-dom';
import Root from './views/Root';
import AccessKeys from './views/AccessKeys';
import OurTeam from "./views/OurTeam";
import AuthRoutes from "./views/AuthRoutes";
import { useSelector } from "react-redux";
import { InitialState } from "./reducers/modules/user-reducer";


const PrivateRoute = (isAuth: any) => {
    // console.log("isAuth, ", isAuth);
    return (
        // isAuth ? <Outlet /> : <Navigate to="/" />
        isAuth.isAuthenticated ? <Outlet /> : <Navigate to="/" />
    );
}
interface Props {
}
interface StateProps {
    isAuthenticated: boolean;
}


const Router: FC<Props> = () => {

    const { isAuthenticated } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            isAuthenticated: state.isAuthenticated
        }
    });

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/home" element={<AuthRoutes />} />
                <Route path="/access-keys" element={<AccessKeys />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                    <Route path="/app/*" element={<AuthRoutes />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}


export default Router;
