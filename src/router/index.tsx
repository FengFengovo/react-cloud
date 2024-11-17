import {createBrowserRouter} from "react-router-dom";
import CloudLayout from "@/pages/Layout";
import Recommend from "@/views/Recommend";
import Daily from "@/views/Daily";
import PlayList from "@/views/PlayList";
import Recently from "@/views/Recently";
const router = createBrowserRouter([
    {
        path: "/",
        element:<CloudLayout/>,
        children:[
            {
                index:true,
                element:<Recommend/>
            },
            {
                path:'dailySongs',
                element:<Daily/>
            },
            {
                path:'playList',
                element:<PlayList/>
            },
            {
                path:'recently',
                element:<Recently/>
            }
        ]
    }
])
export default router