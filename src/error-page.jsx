import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg text-red-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go back to home
      </Link>
    </div>
  );
};
