import Login from "./Pages/Login";
import { CarsList, CarsCreate, CarsUpdate, CarsDetail } from './Pages/Cars';

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { theme } from './Config/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CarsList />,
  },
  {
    path: '/detail/:id',
    element: <CarsDetail />,
  },
  {
    path: '/create',
    element: <CarsCreate />,
  },
  {
    path: '/update/:id',
    element: <CarsUpdate />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );

}

export default App;
