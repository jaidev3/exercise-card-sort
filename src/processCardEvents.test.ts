import { processCardEvents } from './processCardEvents'
import { cardEventsFromDifferentCards } from './inputs/cardEventsFromDifferentCards'
import { cardEventsWithDuplicates } from './inputs/cardEventsWithDuplicates'
import { incompleteCardEvents } from './inputs/incompleteCardEvents'

describe('processCardEvents', () => {
  test('it returns valid transactions by cardId', () => {
    expect(processCardEvents(cardEventsFromDifferentCards)).toEqual({
      ALICE: [
        {
          amount: 11111,
          cardId: 'ALICE',
          id: '71ff84a1-8d6e-4f44-b74c-310dbde877de',
          type: 'RESERVATION',
        },
        {
          amount: 11111,
          cardId: 'ALICE',
          id: '0a646991-4898-4751-8bf6-c266a6728885',
          type: 'CONFIRMATION',
        },
      ],
      BOB: [
        {
          amount: 22222,
          cardId: 'BOB',
          id: '2ace1ea9-b57e-4d0c-926c-d570450d17c6',
          type: 'RESERVATION',
        },
        {
          amount: 22222,
          cardId: 'BOB',
          id: '98d4608c-862a-4b46-9839-2faa30a65d30',
          type: 'CANCELLATION',
        },
      ],
    })
  })

  test('it excludes duplicate events', () => {
    expect(processCardEvents(cardEventsWithDuplicates)).toEqual({
      ALICE: [
        {
          amount: 22222,
          cardId: 'ALICE',
          id: '3d311f2f-1f36-4dc6-81a3-ada9af60f74f',
          type: 'RESERVATION',
        },
        {
          amount: 22222,
          cardId: 'ALICE',
          id: '0099ebb1-b63f-46d1-b481-1ff88b75d527',
          type: 'CANCELLATION',
        },
      ],
    })
  })

  test('it excludes incomplete transactions', () => {
    expect(processCardEvents(incompleteCardEvents)).toEqual({
      CHARLIE: [
        {
          amount: 9999,
          cardId: 'CHARLIE', // starting event
          id: '71ff84a1-8d6e-4f44-b74c-310dbde877de',
          type: 'RESERVATION',
        },
        {
          amount: 9999,
          cardId: 'CHARLIE', // finishing event
          id: '0a646991-4898-4751-8bf6-c266a6728885',
          type: 'CONFIRMATION',
        },
      ],
    })
  })
})
