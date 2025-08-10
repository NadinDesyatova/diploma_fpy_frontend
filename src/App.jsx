import './App.css';
import MainHeader from './ui/main-header/MainHeader';
import { StartPage } from './ui/start-page/StartPage';
import { FilesWelcome } from './ui/files/FilesWelcome';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AdminPage } from './ui/admin/AdminPage';
import { UserFilesForAdmin } from './ui/admin/UserFilesForAdmin';
import { ShareFilePage } from './ui/share-file-page/ShareFilePage';

function App() {

  return (
    <div className="main-container">
      <MainHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/files" element={<FilesWelcome />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user_files" element={<UserFilesForAdmin />} />
          <Route path="/share/:fileLink" element={<ShareFilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
