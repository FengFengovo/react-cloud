import {createBrowserRouter} from "react-router-dom";
import CloudLayout from "@/pages/Layout";
import Recommend from "@/views/Recommend";
import Daily from "@/views/Daily";
import PlayList from "@/views/PlayList";
import Recently from "@/views/Recently";
import Search from "@/views/Search";
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
            },
            {
                path:'search',
                element:<Search/>
            }
        ]
    }
])
export default router