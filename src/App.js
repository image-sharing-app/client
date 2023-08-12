import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ImageProvider } from "./contexts/ImageContext";
import { UserProvider } from "./contexts/UserContext";
import ImageDetail from "./pages/ImageDetail";
import Profile from "./pages/Profile";
import ImageUpload from "./pages/ImageUpload";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <ImageProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/image/upload" element={<ImageUpload />} />
              <Route path="/image/:imageId" element={<ImageDetail />} />
            </Routes>
          </ImageProvider>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
