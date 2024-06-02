import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading</div>;
const TodoList = lazy(() => import("../pages/todo/ListPage"));
const TodoRead = lazy(() => import("../pages/todo/ReadPage"));
const AddPage = lazy(() => import("../pages/todo/AddPage"));
const ModifyPage = lazy(() => import("../pages/todo/ModifyPage"));

function todoRouter() {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <TodoList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "read/:tno",
      element: (
        <Suspense fallback={Loading}>
          <TodoRead />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <AddPage />
        </Suspense>
      ),
    },
    {
      path: "modify/:tno",
      element: (
        <Suspense fallback={Loading}>
          <ModifyPage />
        </Suspense>
      ),
    },
  ];
}

export default todoRouter;
