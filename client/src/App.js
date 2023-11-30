import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import socket from "socket";
import HomePage from "scenes/homepage";
import LoginPage from "scenes/loginpage";
import ProfilePage from "scenes/profilepage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import ChatPage from "scenes/chatroom";
import Message from "scenes/message";

socket.on('message', (data) => {
  console.log('received message:', data);
});

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/chatroom" element={isAuth ? <ChatPage /> : <Navigate to="/" />} />
          <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="/message" element={isAuth ? <Message /> : <Navigate to="/" />} />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
