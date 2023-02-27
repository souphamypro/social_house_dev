import React, {Suspense} from "react";
import {Routes, Route} from "react-router-dom";

import MemberShip from "./MemberShip";

export default function AppRoutes() {
    return (
        // <AppLayout>
        <div className="dashboard-wrapper h-100">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="memberShip" element={<MemberShip />} />
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
