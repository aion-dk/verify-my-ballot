import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type Step = {
  name: string
  url: string
}

const steps: Step[] = [
  {
    name: 'Find my ballot',
    url: 'find-my-ballot',
  },
  {
    name: 'Ballot found',
    url: 'ballot-found',
  },
  {
    name: 'Passkey',
    url: 'passkey',
  },
  {
    name: 'Unsealed ballot',
    url: 'unsealed-ballot',
  },
  {
    name: 'Finish',
    url: 'finish',
  },
]

interface AppFooterProps {}

const AppFooter: React.FC<AppFooterProps> = () => {
  const location = useLocation()

  // Update progress on location change
  useEffect(() => {
    const stepElements = document.querySelectorAll('.step')
    const textElements = document.querySelectorAll('.text-elm')

    const activeIndex = steps.findIndex(object => {
      return location.pathname.includes(object.url)
    })

    stepElements.forEach((step, i) => {
      let bar = step.getElementsByTagName('div')[0]
      let circle = step.getElementsByTagName('div')[1]
      let text = textElements[i].getElementsByTagName('div')[0]

      if (i <= activeIndex) {
        if (i === activeIndex) {
          console.log(i)
          console.log('Active index: ' + activeIndex)

          //Remove earlier classes
          circle.classList.remove('current')
          bar.classList.remove('tiles')
          text.classList.remove('current')

          //Active page
          step.classList.add('active')
          circle.classList.add('active-circle')
          text.classList.add('active')
          bar.classList.add('stripes')
        } else {
          //Remove earlier classes
          step.classList.remove('active')
          circle.classList.remove('active-circle')
          text.classList.remove('active')
          bar.classList.remove('stripes')

          //Has been visited
          step.classList.add('current')
          circle.classList.add('current')
          text.classList.add('current')
          bar.classList.add('tiles')
        }
      } else {
        //Not been visited yet
        step.classList.remove('active')
        step.classList.remove('current')
        text.classList.remove('current')
        text.classList.remove('active')
        circle.classList.remove('current')
        circle.classList.remove('active-circle')
        bar.classList.remove('stripes')
        bar.classList.remove('tiles')
      }
    })
  }, [location])

  const shouldRenderProgress = () => {
    const activeIndex = steps.findIndex(object => {
      return location.pathname.includes(object.url)
    })
    return activeIndex !== -1
  }

  if (!shouldRenderProgress()) {
    return <></>
  }

  return (
    <footer className="bg-brand-background py-[30px] flex flex-col items-center">
      <div className="flex items-end mb-[16px] justify-between pl-[36px] md:pl-[110px] lg:pl-[146px] w-[350px] md:w-[700px] lg:w-[900px]">
        {steps.map((step, index) => {
          return (
            <div className="step-text text-elm" key={index}>
              <div>{step.name}</div>{' '}
            </div>
          )
        })}
      </div>

      <div className="flex items-center w-[350px] md:w-[700px] lg:w-[900px]">
        {steps.map((step, index) => {
          return (
            <div className="step" key={index}>
              <div
                className={`bar ${index === 0 ? 'rounded-l-full' : ''}`}
              ></div>
              <div className="circle">{index + 1}</div>
              {/*  active-circle */}
            </div>
          )
        })}
      </div>
    </footer>
  )
}

export default AppFooter
