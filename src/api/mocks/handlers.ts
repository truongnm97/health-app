import { setupWorker } from 'msw'
import authHandlers from './auth'
import userHandlers from './user'

export const handlers = [...authHandlers, ...userHandlers]

export const worker = setupWorker(...handlers)
