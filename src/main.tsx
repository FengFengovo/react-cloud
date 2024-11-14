
import ReactDOM from 'react-dom/client'
import '@/assets/reset.css'
import {RouterProvider} from "react-router-dom";
import router from "./router";
import 'virtual:uno.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}>
    </RouterProvider>
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
