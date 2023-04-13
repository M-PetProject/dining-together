import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/style.css'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          {/* devtools */}
          <ReactQueryDevtools initialIsOpen={true} />
          <App />
      </QueryClientProvider>
  </React.StrictMode>,
)
