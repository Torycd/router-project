import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import MainNavigation from '../components/MainNavigation'

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    message = "Could not find resource or page.";
    title = "Not found";
  }
  return (
    <>
    <MainNavigation/>
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>
    
  );
}
export default ErrorPage;
