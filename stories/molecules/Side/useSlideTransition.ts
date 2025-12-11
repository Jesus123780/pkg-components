'use client'

import React from 'react'

/**
 * useSlideTransition
 *
 * Small state machine for mount/unmount + transition stages.
 *
 * @param params.open - whether the panel should be open
 * @param params.duration - animation duration in ms (default 400)
 */
export const useSlideTransition = ({
  open,
  duration = 400
}: {
  open: boolean
  duration?: number
}): {
  mounted: boolean
  stage: 'entering' | 'entered' | 'exiting' | 'exited'
  duration: number
} => {
  const [stage, setStage] = React.useState<
    'entering' | 'entered' | 'exiting' | 'exited'
  >(() => (open ? 'entering' : 'exited'))

  React.useEffect(() => {
    let enterTimeout: number | undefined
    let finishEnterRAF: number | undefined
    let exitTimeout: number | undefined

    if (open) {
      if (stage === 'exited') {
        setStage('entering')
        finishEnterRAF = window.requestAnimationFrame(() => {
          enterTimeout = window.setTimeout(() => setStage('entered'), 20)
        })
      } else if (stage === 'exiting') {
        setStage('entering')
        finishEnterRAF = window.requestAnimationFrame(() => {
          enterTimeout = window.setTimeout(() => setStage('entered'), 20)
        })
      } else if (stage === 'entering') {
        enterTimeout = window.setTimeout(() => setStage('entered'), duration + 20)
      }
    } else {
      if (stage === 'entered' || stage === 'entering') {
        setStage('exiting')
        exitTimeout = window.setTimeout(() => setStage('exited'), duration)
      }
    }

    return () => {
      if (enterTimeout) window.clearTimeout(enterTimeout)
      if (exitTimeout) window.clearTimeout(exitTimeout)
      if (finishEnterRAF) window.cancelAnimationFrame(finishEnterRAF)
    }
    // depend on open & duration only (stage handled internally)
  }, [open, duration])

  return {
    mounted: stage !== 'exited',
    stage,
    duration
  }
}
