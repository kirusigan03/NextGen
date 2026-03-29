import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routers/router.jsx'
import 'remixicon/fonts/remixicon.css'

import store from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(



    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,

)
