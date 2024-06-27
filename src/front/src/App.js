// import logo from './logo.svg';
// import { Provider } from 'react-redux'
// import store from './redux/store'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage'
import MainPage from "./pages/Main/MainPage";
import Calendar from "./pages/Main/calendar";

function App() {
  return (
    /*<Provider store={store} >*/
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/main/*" element={<MainPage />} />
              </Routes>
          </Router>
      </div>
    /*</Provider>*/
  );
}

export default App;
