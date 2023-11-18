import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ItemPage from './pages/ItemPage';
import { Provider } from 'react-redux';
import { setupStore } from './redux/index.ts';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<ItemPage />} />
        </Route>
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
