import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'
import ScrollToTop from '@shared/ScrollToTop'
import SigninPage from '@pages/Signin'
import SignupPage from '@pages/Signup'
import ApplyPage from '@pages/Apply'

import PrivateRoute from '@components/auth/PrivateRoute'

import Navbar from '@shared/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/test" Component={TestPage} />
          <Route path="/card/:id" Component={CardPage} />
          <Route path="/signin" Component={SigninPage} />
          <Route path="/signup" Component={SignupPage} />
          <Route
            path="/apply/:id"
            element={
              <PrivateRoute>
                <ApplyPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
