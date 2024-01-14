import logo from './logo.svg';
import './App.css';
import Homepage from './routes/homepage';
import { RouterProvider, createBrowserRouter, useLocation, useRoutes } from "react-router-dom";
import Loginpage from './routes/loginpage';
import Dashboard from './routes/dashboard';
import Cj from './routes/cj';
import Snatch from './routes/snatch';
import Gs from './routes/gs';
import Goals from './routes/goals';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Loginpage/>
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    },
    {
      path:'/cj',
      element:<Cj/>
    },
    {
      path:'/snatch',
      element:<Snatch/>
    },
    {
      path:'/gs',
      element:<Gs/>
    },
    {
      path:'/goals',
      element:<Goals/>
    }

  ])






  return (
    <RouterProvider router={router}/>
  );
}

export default App;
