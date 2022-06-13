import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { ImMinus } from 'react-icons/im'
import AccessibleSpan from '../components/AccessibleSpan'
import { mod } from '../utils'

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitem_role
function isOpenMenuKey(key: string): boolean {
  return key === 'Enter' || key === ' ' || key === 'ArrowDown'
}

type FAQ = {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Where do I find my ballot tracking code?',
    answer: 'Placeholder answer',
  },
  {
    question:
      'My ballot is not found. After I input the ballot tracking code, I am getting an error message.',
    answer: 'Placeholder answer',
  },
  {
    question: 'The displayed passkey does not match. What do I do?',
    answer: 'Placeholder answer',
  },
  {
    question: 'Can I submit a ballot on this site?',
    answer: 'Placeholder answer',
  },
  {
    question: 'I want to submit my ballot. What do I do?',
    answer:
      'You must submit your ballot from the Mark.It app to complete the voting process. In case of any problems you should contact your local election office and talk to the election official - phone number: 090090990, email: localeo@yourelection.com',
  },
]

interface FAQScreenProps {}

const FAQScreen: React.FC<FAQScreenProps> = () => {
  const [activeQ, setActiveQ] = useState(-1)

  const handleChange = (i: number) => {
    if (i === activeQ) {
      // None are active
      setActiveQ(-1)
      document.getElementById(`faq-${i}`)?.focus()
    } else {
      // Wrap around
      const newIndex = mod(i, faqs.length)
      setActiveQ(newIndex)
      document.getElementById(`faq-${newIndex}`)?.focus()
    }
  }

  const renderOpenQuestion = (faq: FAQ, i: number) => {
    return (
      <li
        key={i}
        className="w-[94%] md:w-[750px] lg:w-[850px] bg-brand-blue p-[1px] pt-[4px] text-white border-[3px] border-brand-blue cursor-pointer"
        id={`faq-${i}`}
        onClick={() => handleChange(i)}
        role="menuitem"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') {
            handleChange(i + 1)
            return
          }
          if (e.key === 'ArrowUp') {
            handleChange(i - 1)
          }
          if (isOpenMenuKey(e.key) || e.key === 'Escape') {
            handleChange(i)
          }
        }}
      >
        <div className="flex justify-between h-[60px] pl-[6px]">
          <p>
            <AccessibleSpan screenReaderText="Question:">Q: </AccessibleSpan>
            <span className="font-semibold">{faq.question}</span>
          </p>
          <div className="self-center mr-[6px]">
            <ImMinus
              color="#C04535"
              size="20px"
              title="Close menu"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="bg-white text-brand-dark p-[8px] text-[18px]">
          <AccessibleSpan
            screenReaderText="Answer:"
            className="text-[18px] font-semibold"
          >
            A:{' '}
          </AccessibleSpan>
          {faq.answer}
        </p>
      </li>
    )
  }

  const renderClosedQuestion = (faq: FAQ, i: number) => {
    return (
      <li
        key={i}
        className="w-[90%] md:w-[700px] lg:w-[800px] bg-brand-background cursor-pointer border-[3px] mb-[-3px] border-white  pl-[16px] pr-[4px] py-[8px] flex items-center justify-between"
        id={`faq-${i}`}
        onClick={() => handleChange(i)}
        role="menuitem"
        aria-haspopup="true"
        tabIndex={0}
        onKeyDown={e => {
          if (isOpenMenuKey(e.key)) {
            handleChange(i)
          }
        }}
      >
        <p>
          <AccessibleSpan screenReaderText="Question:">Q: </AccessibleSpan>
          <span className="font-semibold">{faq.question}</span>
        </p>
        <div>
          <GoPlus
            color="#1226aa"
            size="26px"
            title="Open menu"
            aria-hidden="true"
          />
        </div>
      </li>
    )
  }

  return (
    <main className="page">
      <h1>Frequently Asked Questions</h1>
      <ul className="flex flex-col items-center" role="menu" data-cy="faq-menu">
        {faqs.map((faq, i) => {
          if (i === activeQ) {
            return renderOpenQuestion(faq, i)
          } else {
            return renderClosedQuestion(faq, i)
          }
        })}
      </ul>
    </main>
  )
}

export default FAQScreen
