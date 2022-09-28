import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import AccessibleSpan from '../components/AccessibleSpan'
import ScreenMain from '../components/ScreenMain'

interface AboutScreenProps {}

const AboutScreen: React.FC<AboutScreenProps> = () => {
  return (
    <ScreenMain>
      <h1>About VerifyMyBallot site</h1>
      <p className="max-w-[440px] page-content" role="text">
        This site serves as a ballot checking site to enable you to
        <strong> verify that your ballot was recorded correctly </strong>
        in your voting app and will be cast correctly in the digital ballot box.
      </p>

      <div className="h-[2px] w-[60px] bg-red-500"></div>

      <div className="border-[2px] border-dotted border-brand-dark dark:border-white flex items-center p-[8px] mt-[80px] md:mt-[110px]">
        <div className="px-[8px] text-brand-blue dark:text-white">
          <FaQuestionCircle
            size="50px"
            aria-label="Question mark icon"
            title="Question mark icon"
            aria-hidden="true"
          />
        </div>
        <p className="flex flex-col">
          <span className="font-semibold">
            <AccessibleSpan screenReaderText="Question:">Q: </AccessibleSpan>
            Can i submit my ballot on this site?
          </span>
          <span className="max-w-[320px]">
            <AccessibleSpan
              screenReaderText="Answer:"
              className="font-semibold"
            >
              A:{' '}
            </AccessibleSpan>
            This site cannot submit your ballot for casting. Remember when
            finished with the ballot check, you must submit your ballot from the
            Mark.It app to complete the voting process.
          </span>
        </p>
      </div>
    </ScreenMain>
  )
}

export default AboutScreen
