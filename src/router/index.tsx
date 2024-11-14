import {createBrowserRouter} from "react-router-dom";
import CloudLayout from "@/pages/Layout";
import Recommend from "@/views/Recommend";
import Daily from "@/views/Daily";
import PlayList from "@/views/PlayList";
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
            }
        ]
    }
])
export default router