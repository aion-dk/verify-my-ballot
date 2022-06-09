import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa'

interface AboutScreenProps {}

const AboutScreen: React.FC<AboutScreenProps> = () => {
  return (
    <main className="page">
      <h1>About VerifyMyBallot site</h1>
      <p className="max-w-[440px] page-content">
        This site serves as a ballot checking site to enable you to
        <span className="highlight">
          {' '}
          verify that your ballot was recorded correctly{' '}
        </span>
        in your voting app and will be cast correctly in the digital ballot box.
      </p>

      <div className="h-[2px] w-[60px] bg-red-500"></div>

      <div className="border-[2px] border-dotted border-brand-dark flex items-center p-[8px] mt-[80px] md:mt-[110px]">
        <div className="px-[8px]">
          <FaQuestionCircle
            color="#1226aa"
            size="50px"
            aria-label="Question mark icon"
            title="Question mark icon"
          />
        </div>
        <p className="flex flex-col">
          <span className="font-semibold">
            Q: Can i submit my ballot on this site?
          </span>
          <span className="max-w-[320px]">
            <span className="font-semibold">A: </span>
            This site cannot submit your ballot for casting. Remember when
            finished with the ballot check, you must submit your ballot from the
            MarkIt app to complete the voting process.
          </span>
        </p>
      </div>
    </main>
  )
}

export default AboutScreen
