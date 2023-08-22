import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
// import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventsRoot from "./pages/EventsRoot";
import ErrorElement from "./pages/Error";
// import NewsLetterPage from "./pages/NewsLetterPage";
import EditEventPage from "./pages/EditEventPage";
import NewEventPage, {
  action as manipulateEventForm,
} from "./pages/NewEventPage";
import EventDetailPage from "./pages/EventDetailPage";

import { action as editEventForm } from "./components/EventForm";
import { lazy, Suspense } from "react";

// this is for lazy loading
const EventsPage = lazy(() => import("./pages/EventsPage"));

const NewsLetterPage = lazy(() => import("./pages/NewsLetterPage"));
const routesAll = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>loading...</p>}>
                <EventsPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/EventsPage").then((module) => module.loader()),
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: (meta) =>
              import("./pages/EventDetailPage").then((module) =>
                module.loader(meta)
              ),
            children: [
              { index: true, element: <EventDetailPage /> },
              {
                path: "edit",
                element: <EditEventPage />,
                action: editEventForm,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventForm,
          },
        ],
      },
      {
        path: "newsletter",
        element: (
          <Suspense fallback={<p>loading...</p>}>
            <NewsLetterPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routesAll} />;
}

export default App;
