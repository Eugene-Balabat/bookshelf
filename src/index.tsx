import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App'
import { setupStore } from './store/store'
import { CookiesProvider } from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const store = setupStore()

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
)
