import { Routes, Route, Navigate } from "react-router-dom";

import StartPage from "./pages/StartPage";
import PhoneHome from "./pages/PhoneHome";
import ForumPage from "./pages/ForumPage";
import HomeMindPage from "./pages/HomeMindPage";
import AdminPage from "./pages/AdminPage";
import EndingPage from "./pages/EndingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/phone" element={<PhoneHome />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path="/homemind" element={<HomeMindPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/ending" element={<EndingPage />} />

      {/* 为什么要兜底：防止输错地址/刷新到不存在页面导致白屏 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
