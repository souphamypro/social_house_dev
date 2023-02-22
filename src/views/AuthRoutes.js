import React, {Suspense} from "react";
import {Routes, Route} from "react-router-dom";

// import Home from "./project/Home";
// import EditAsset from "./asset/EditAsset";
// import MintAsset from "./asset/MintAsset";
// import Account from "./account/Account.js";

export default function AppRoutes() {
    return (
        // <AppLayout>
        <div className="dashboard-wrapper">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* <Route path="" element={<Home />} /> */}
                    {/* <Route path="project" element={<Home />} />
                        <Route path="account" element={<Account />} />
                        <Route path="create-project" element={<CreateProject />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="api" element={<API />} />
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="assets" element={<Assets />} />
                        <Route path="create-asset" element={<CreateAsset/>} /> */}
                </Routes>
            </Suspense>
        </div>
        // </AppLayout>
    )
};
