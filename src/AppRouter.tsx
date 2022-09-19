import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AboutScreen from './screens/AboutScreen'
import BallotFoundScreen from './screens/BallotFoundScreen'
import FAQScreen from './screens/FAQScreen'
import FindMyBallotScreen from './screens/FindMyBallotScreen'
import FinishScreen from './screens/FinishScreen'
import GettingStartedScreen from './screens/GettingStartedScreen'
import PasskeyScreen from './screens/PasskeyScreen'
import UnsealedBallotScreen from './screens/UnsealedBallotScreen'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import SessionExpiredScreen from './screens/SessionExpiredScreen'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { wrapHistory } from 'oaf-react-router'
import VerifierClientProvider from './containers/VerifierClientProvider'
import ErrorScreen from './screens/ErrorScreen'

// Patch react-router with accessible SPA navigation with page announcements and focus
const history = createBrowserHistory()
wrapHistory(history)

// Listen for router changes and focus root element for improved accessibility
history.listen(() => {
  let root = document.getElementById('root')
  if (root) root.focus()
})

interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <HistoryRouter history={history}>
      <a href="#content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<Navigate to="error" />} />
            <Route path="error" element={<ErrorScreen />} />
            <Route path=":boardSlug">
              <Route index element={<GettingStartedScreen />} />
              <Route path="about" element={<AboutScreen />} />
              <Route path="faq" element={<FAQScreen />} />
              <Route path="find-my-ballot" element={<FindMyBallotScreen />} />
              <Route path="ballot-found" element={<BallotFoundScreen />} />
              <Route path="passkey/:pairingCode" element={<PasskeyScreen />} />
              <Route
                path="unsealed-ballot"
                element={<UnsealedBallotScreen />}
              />
              <Route path="finish" element={<FinishScreen />} />
              <Route path="expired" element={<SessionExpiredScreen />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

const PageLayout: React.FC = () => {
  return (
    <VerifierClientProvider>
      <AppHeader />

      <div className="h-full">
        <Outlet />
      </div>

      <AppFooter />
    </VerifierClientProvider>
  )
}

export default AppRouter
