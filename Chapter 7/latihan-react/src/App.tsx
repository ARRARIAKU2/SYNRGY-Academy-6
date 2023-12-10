import Login from "./Pages/Login";
import { BooksList, BooksCreate, BooksUpdate, BooksDetail } from './Pages/Books';

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { theme } from './Config/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BooksList />,
  },
  {
    path: '/detail/:id',
    element: <BooksDetail />,
  },
  {
    path: '/create',
    element: <BooksCreate />,
  },
  {
    path: '/update/:id',
    element: <BooksUpdate />,
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
