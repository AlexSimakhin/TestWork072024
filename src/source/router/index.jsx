import { createBrowserRouter } from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import {ContactPage} from "../pages/ContactPage";
import {ErrorPage} from "../../error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contact/:contactId",
    element: <ContactPage />,
  },
]);

export default router;