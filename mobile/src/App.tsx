import { Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chat/:roomId" element={<ChatPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
