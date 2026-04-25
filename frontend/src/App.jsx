import { RouterProvider } from "react-router"
import {router} from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { SongContextProvider } from "./features/home/song.context.jsx"

function App() {


  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router}/>
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App