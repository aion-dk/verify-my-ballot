import { AVVerifier } from '@aion-dk/js-client'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_ELECTION_URL } from '../constants'
import ClientContext from '../contexts/ClientContext'
import MockVerifierClient from '../MockVerifierClient'

let mockClient: AVVerifier
if ((window as any).Cypress || process.env.REACT_APP_TESTING) {
  mockClient = new MockVerifierClient('')
  // @ts-ignore
  window.client = mockClient
}

const VerifierClientProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { boardSlug } = useParams<{ boardSlug: string }>()
  const [verifierClient, setVerifierClient] = useState<AVVerifier>()
  const navigate = useNavigate()

  useEffect(() => {
    async function initialize() {
      let client: AVVerifier
      if (process.env.REACT_APP_TESTING) {
        client = mockClient
      } else {
        client = new AVVerifier(`${BASE_ELECTION_URL}/${boardSlug}`)
      }

      try {
        console.debug(`Initializing client with board slug: '${boardSlug}'`)
        await client.initialize()
      } catch (e) {
        console.error(
          'There was an error while initializing js-client, the site will not work properly in this state.'
        )
        console.error(e)
        navigate('error')
      } finally {
        setVerifierClient(client)
      }
    }

    if (!verifierClient) {
      initialize()
    }
  }, [boardSlug, navigate, verifierClient])

  if (!verifierClient) return <></>

  return (
    <ClientContext.Provider value={verifierClient}>
      {children}
    </ClientContext.Provider>
  )
}

export default VerifierClientProvider
