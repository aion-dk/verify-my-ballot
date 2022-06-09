import { AVVerifier, ElectionConfig } from '@aion-dk/js-client'
import {
  ContestSelection,
  ReadableContestSelection,
} from '@aion-dk/js-client/dist/lib/av_client/types'
import { MOCK_RESPONSE_MS } from './constants'

const MOCKED_BALLOTS_DB: { [trackingCode: string]: ContestSelection[] } = {
  '12345': [
    {
      optionSelections: [{ reference: 'A' }],
      reference: '1',
    },
    {
      optionSelections: [{ reference: 'B' }],
      reference: '2',
    },
    {
      optionSelections: [{ reference: 'C' }],
      reference: '3',
    },
  ],
}

export default class MockVerifierClient extends AVVerifier {
  private _init = false
  private _trackingCode = ''

  public initialize(electionConfig: ElectionConfig): Promise<void>
  public initialize(): Promise<void>

  public initialize(electionConfig?: ElectionConfig) {
    return new Promise<void>((resolve, reject) => {
      this._init = true
      resolve()
    })
  }
  public findBallot(trackingCode: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this._init) reject('Not initialized')

      this._trackingCode = trackingCode
      if (MOCKED_BALLOTS_DB[trackingCode]) resolve('success')
      else reject('Ballot not found')
    })
  }
  public pollForSpoilRequest(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this._init) reject('Not initialized')
        resolve('mock-spoil-request')
      }, MOCK_RESPONSE_MS)
    })
  }
  public pollForCommitmentOpening(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this._init) reject('Not initialized')
        resolve({})
      }, MOCK_RESPONSE_MS)
    })
  }
  public submitVerifierKey(spoilRequestAddress: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this._init) reject('Not initialized')
      resolve('6z5VThK')
    })
  }
  public decryptBallot(): ContestSelection[] {
    if (!this._init) throw new Error('Not initialized')
    const ballot = MOCKED_BALLOTS_DB[this._trackingCode]
    if (ballot) return ballot
    else throw new Error('Ballot not found')
  }
  getReadableContestSelections(
    contestSelections: ContestSelection[],
    locale: string
  ): ReadableContestSelection[] {
    return contestSelections.map(cs => ({
      optionSelections: cs.optionSelections.map(os => ({
        reference: os.reference,
        title: `Option ${os.reference}`,
        text: os.text,
      })),
      reference: cs.reference,
      title: `Contest ${cs.reference}`,
    }))
  }
}
