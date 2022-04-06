import React from 'react'
import ReactDOM from 'react-dom'
import { queryClient } from './services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query'
import App from './App.jsx'
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
  </QueryClientProvider>,
  document.getElementById('root')
)
