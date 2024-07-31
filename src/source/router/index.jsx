import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "test",
    element: <div>Hello world!</div>,
  },
]);

export default router;