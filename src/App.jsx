import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import UserProfilePage from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import AdoptionForm from "./pages/AdoptionForm";
import ChatBot from "./pages/ChatBot";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/auth/sign-up" element={<SignUp />}></Route>
                    <Route path="/auth/login" element={<LogIn />}></Route>
                    <Route
                        path="/user/dashboard"
                        element={<Dashboard />}
                    ></Route>
                    <Route path="/user/profile" element={<UserProfilePage />} />
                    <Route path="/pet/adoption" element={<AdoptionForm />} />
                    <Route path="/chat" element={<ChatBot />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
