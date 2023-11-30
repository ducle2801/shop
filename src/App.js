import './App.css'
import React, {Suspense} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Loading from './Loading'

const Shop = React.lazy(() => import('./Shop'))
const Manage = React.lazy(() => import('./Manage'))
const Deliver = React.lazy(() => import('./Deliver'))
const NotFound = React.lazy(() => import('./components/NotFound'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/shop" />} />
          <Route path="/manage" element={<Navigate replace to="/manage/login" />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/manage/*" element={<Manage />} />
          <Route path="/deliver/*" element={<Deliver />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
