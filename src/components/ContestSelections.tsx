import { 
  ReadableContestSelection, 
  ReadableSelectionPile,
  ReadableOptionSelection,
} from '@aion-dk/js-client/dist/lib/av_client/types'

const ContestSelections = ({ selections }: any) => {
  return (
    <ol className="mb-[20px] pl-4 overflow-y-auto" data-cy="ballot-choices">
      {selections.map((rcs: ReadableContestSelection) => (
        <li key={rcs.reference} className="dark:text-white">
          <span className="font-bold dark:text-white">{rcs.title}: </span>

          {rcs.piles.flatMap((pile: ReadableSelectionPile) => (
            pile.optionSelections.map((os: ReadableOptionSelection) => (
              <ol className="pl-4">
                <li key={os.reference}>{os?.text || os?.title}</li>
              </ol>
            ))
          ))}
        </li>
      ))}
    </ol>
  )
}

export default ContestSelections
