import { AVVerifier } from '@aion-dk/js-client'
import {
  ContestSelection,
  SelectionPile,
  OptionSelection,
  ReadableContestSelection,
} from '@aion-dk/js-client/dist/lib/av_client/types'
import { MOCK_RESPONSE_MS } from './constants'

export const MOCKED_BALLOTS_DB: { [trackingCode: string]: ContestSelection[] } =
  {
  '12345': [
    {
      reference: '1',
      piles: [
        {
          multiplier: 1,
          optionSelections: [
            {
              reference: 'A',
              text: 'Option A'
            }
          ],
        }
      ]
    },
    {
      reference: '2',
      piles: [
        {
          multiplier: 1,
          optionSelections: [
            {
              reference: 'B',
              text: 'Option B'
            }
          ],
        }
      ]
    },
    {
      reference: '3',
      piles: [
        {
          multiplier: 1,
          optionSelections: [
            {
              reference: 'C',
              text: 'Option C'
            }
          ],
        }
      ]
    },
  ],
}

export default class MockVerifierClient extends AVVerifier {
  private _init = false
  private _trackingCode = ''

  public initialize(electionConfig: any): Promise<void>
  public initialize(): Promise<void>

  public initialize(_electionConfig?: any) {
    return new Promise<void>((resolve, _reject) => {
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
    _locale: string
  ): ReadableContestSelection[] {
    return contestSelections.map(cs => ({
      piles: cs.piles.map((pile: SelectionPile) => ({
        multiplier: 1,
        optionSelections: pile.optionSelections.map((os: OptionSelection) => ({
          reference: os.reference,
          title: `Option ${os.reference}`,
          text: os.text,
        })),
      })),
      reference: cs.reference,
      title: `Contest ${cs.reference}`,
    }))
  }
}
