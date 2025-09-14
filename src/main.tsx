import ReactDOM from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import routes from './routes.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

console.log(BASE_URL)

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
)