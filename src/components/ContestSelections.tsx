import { ReadableContestSelection } from '@aion-dk/js-client/dist/lib/av_client/types'

interface ContestSelectionProps {
  selections: ReadableContestSelection[]
}

const ContestSelections = ({ selections }: any) => {
  return (
    <ol className="mb-[20px] pl-4 overflow-y-auto" data-cy="ballot-choices">
      {selections.map((cs: ReadableContestSelection) => (
        <li key={cs.reference} className="dark:text-white">
          <span className="font-bold dark:text-white">{cs.title}: </span>

          <ol className="pl-4">
            {cs.optionSelections.map(os => (
              <li key={os.reference}>{os?.text || os?.title}</li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}

export default ContestSelections
