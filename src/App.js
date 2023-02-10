import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import './App.css'; 
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home';
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
