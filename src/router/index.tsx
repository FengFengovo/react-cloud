import { createBrowserRouter } from "react-router-dom"

import CloudLayout from "@/pages/Layout"
import { lazy, Suspense } from "react"
//配置路由懒加载
const Recommend = lazy(() => import("@/views/Recommend"))
const Daily = lazy(() => import("@/views/Daily"))
const PlayList = lazy(() => import("@/views/PlayList"))
const Recently = lazy(() => import("@/views/Recently"))
const Search = lazy(() => import("@/views/Search"))
const UserHome = lazy(() => import("@/views/UserHome"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <CloudLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={""}>
            <Recommend />
          </Suspense>
        ),
      },
      {
        path: "dailySongs",
        element: (
          <Suspense fallback={""}>
            <Daily />
          </Suspense>
        ),
      },
      {
        path: "playList",
        element: (
          <Suspense fallback={""}>
            <PlayList />
          </Suspense>
        ),
      },
      {
        path: "recently",
        element: (
          <Suspense fallback={""}>
            <Recently />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={""}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "userhome",
        element: (
          <Suspense fallback={""}>
            <UserHome />
          </Suspense>
        ),
      },
    ],
  },
])
export default router
