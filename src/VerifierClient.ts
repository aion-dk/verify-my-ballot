import { AVVerifier } from '@aion-dk/js-client'
import { DEFAULT_ELECTION_URL } from './constants'
import MockVerifierClient from './MockVerifierClient'

const VerifierClient = process.env.REACT_APP_TESTING
  ? new MockVerifierClient('')
  : new AVVerifier(DEFAULT_ELECTION_URL)

// Bind Client to window when Cypress is running to be able to stub out the module
// @ts-ignore
if (window.Cypress) window.client = VerifierClient

export default VerifierClient
