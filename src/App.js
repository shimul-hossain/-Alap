import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import './App.css'; 
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home';
import Root from './components/Root';
import Profile from './pages/Profile';
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path='/' element={<Root/>}>
        <Route index element={<Home />}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Route>
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
