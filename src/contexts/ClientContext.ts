import { AVVerifier } from '@aion-dk/js-client'
import { createContext } from 'react'
import { BASE_ELECTION_URL } from '../constants'
import MockVerifierClient from '../MockVerifierClient'

const defaultValue = process.env.REACT_APP_TESTING
  ? new MockVerifierClient('')
  : new AVVerifier(`${BASE_ELECTION_URL}`)

const ClientContext = createContext<AVVerifier>(defaultValue)

export default ClientContext
