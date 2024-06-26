// import logo from './logo.svg';
// import { Provider } from 'react-redux'
// import store from './redux/store'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage'
import MainPage from "./pages/Main/MainPage";

function App() {
  return (
    /*<Provider store={store} >*/
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/MainPage" element={<MainPage />} />
          </Routes>
        </Router>
      </div>
    /*</Provider>*/
  );
}

export default App;
