import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main.tsx';
import NotFoundPage from './pages/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Provider } from 'react-redux';
import { setupStore } from './redux/index.ts';
import UncontrolledPage from './pages/UncontrolledPage.tsx';
import ControlledPage from './pages/ControlledPage.tsx';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uncontrolled" element={<UncontrolledPage />} />
        <Route path="/controlled" element={<ControlledPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <Provider store={setupStore({})}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

export { App, WrappedApp };
