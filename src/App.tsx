import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Hello world!</h1>
      <Routes>
        <Route />
      </Routes>
    </div>
  );
}

function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default WrappedApp;
