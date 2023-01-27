import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>HomePage</h1>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
