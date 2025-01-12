import React, { useState }  from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import MainPage from './components/page/MainPage';
import ViewPostPage from './components/page/ViewPostPage';
import WritePostPage from './components/page/WritePostPage';
import LoginPage from './components/page/LoginPage';
import SignupPage from './components/page/SignupPage';
import EditPostPage from "./components/page/EditPostPage";


function App(props) {
    const [id, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [post_number, setPost_number] = useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="post-write" element={<WritePostPage />} />
                <Route path="post-view" element={<ViewPostPage />} />
                <Route path="log-in" element={<LoginPage/>} />
                <Route path="sign-up" element={<SignupPage />} />
                <Route path="post-edit" element={<EditPostPage />} />

            </Routes>
        </BrowserRouter>

        
    );
}

export default App;
