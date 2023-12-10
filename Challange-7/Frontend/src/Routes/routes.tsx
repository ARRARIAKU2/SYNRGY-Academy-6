import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Home from "../Pages/Home";
import Login from "../Pages/Login";

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" index element={<Home/>} /> */}
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default Router;