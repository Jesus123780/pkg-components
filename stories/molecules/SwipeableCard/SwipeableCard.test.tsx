import React from 'react'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import { SwipeableCard } from './index'

// index.test.tsx

jest.mock('./styles.module.css', () => ({
    __esModule: true,
    default: {
        swipeWrapper: 'swipeWrapper',
        shake: 'shake',
        hiddenActions: 'hiddenActions',
        frontContent: 'frontContent',
    },
}))

const getEls = (container: HTMLElement) => {
    const wrapper = container.querySelector('.swipeWrapper') as HTMLElement
    const front = container.querySelector('.frontContent') as HTMLElement
    const hidden = container.querySelector('.hiddenActions') as HTMLElement
    return { wrapper, front, hidden }
}

const swipe = (el: HTMLElement, fromX: number, toX: number) => {
    fireEvent.pointerDown(el, { clientX: fromX })
    fireEvent.pointerMove(el, { clientX: toX })
}

describe('SwipeableCard', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        cleanup()
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })

    it('renders children and rightActions', () => {
        render(
            <SwipeableCard rightActions={<button aria-label="delete">Del</button>}>
                <div data-testid="content">Item</div>
            </SwipeableCard>
        )
        expect(screen.getByTestId('content')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /del/i })).toBeInTheDocument()
    })

    it('stays closed when swiped less than half width', () => {
        const { container } = render(
            <SwipeableCard>
                <div>Item</div>
            </SwipeableCard>
        )
        const { wrapper, front } = getEls(container)
        swipe(wrapper, 200, 160) // 40px < 50px (half of default 100)
        fireEvent.pointerUp(wrapper)
        expect(front.style.transform).toContain('translateX(0px)')
    })
})