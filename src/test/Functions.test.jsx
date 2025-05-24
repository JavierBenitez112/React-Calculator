import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Functions, { ACTIONS, reducer, evaluate, formatOperand } from '../logic/Functions'
import '@testing-library/jest-dom'

describe('Calculator Functions', () => {
    // Test reducer function
    describe('reducer', () => {
        it('should handle ADD_NUMBER action', () => {
            const initialState = { currentOperand: '1' }
            const action = { type: ACTIONS.ADD_NUMBER, payload: { number: '2' } }
            
            const newState = reducer(initialState, action)
            expect(newState.currentOperand).toBe('12')
        })

        it('should not add more than 9 digits', () => {
            const initialState = { currentOperand: '123456789' }
            const action = { type: ACTIONS.ADD_NUMBER, payload: { number: '0' } }
            
            const newState = reducer(initialState, action)
            expect(newState.currentOperand).toBe('123456789')
        })

        it('should handle decimal point correctly', () => {
            const initialState = { currentOperand: '1' }
            const action = { type: ACTIONS.ADD_NUMBER, payload: { number: '.' } }
            
            let newState = reducer(initialState, action)
            expect(newState.currentOperand).toBe('1.')

            // Should not add another decimal point
            newState = reducer(newState, action)
            expect(newState.currentOperand).toBe('1.')
        })

        it('should handle CLEAR action', () => {
            const initialState = { currentOperand: '123', previousOperand: '456', operator: '+' }
            const action = { type: ACTIONS.CLEAR }
            
            const newState = reducer(initialState, action)
            expect(newState).toEqual({})
        })

        it('should handle DELETE action', () => {
            const initialState = { currentOperand: '123' }
            const action = { type: ACTIONS.DELETE }
            
            const newState = reducer(initialState, action)
            expect(newState.currentOperand).toBe('12')
        })

        it('should handle TOGGLE_SIGN action', () => {
            const initialState = { currentOperand: '123' }
            const action = { type: ACTIONS.TOGGLE_SIGN }
            
            const newState = reducer(initialState, action)
            expect(newState.currentOperand).toBe('-123')
        })
    })

    // Test evaluate function
    describe('evaluate', () => {
        it('should add numbers correctly', () => {
            const state = {
                currentOperand: '2',
                previousOperand: '3',
                operator: '+'
            }
            const result = evaluate(state)
            expect(result).toBe('5')
        })

        it('should subtract numbers correctly', () => {
            const state = {
                currentOperand: '2',
                previousOperand: '5',
                operator: '-'
            }
            const result = evaluate(state)
            expect(result).toBe('3')
        })

        it('should multiply numbers correctly', () => {
            const state = {
                currentOperand: '4',
                previousOperand: '3',
                operator: '×'
            }
            const result = evaluate(state)
            expect(result).toBe('12')
        })

        it('should divide numbers correctly', () => {
            const state = {
                currentOperand: '2',
                previousOperand: '6',
                operator: '÷'
            }
            const result = evaluate(state)
            expect(result).toBe('3')
        })

        it('should return ERROR when dividing by zero', () => {
            const state = {
                currentOperand: '0',
                previousOperand: '6',
                operator: '÷'
            }
            const result = evaluate(state)
            expect(result).toBe('ERROR')
        })

        it('should calculate modulo correctly', () => {
            const state = {
                currentOperand: '3',
                previousOperand: '7',
                operator: '%'
            }
            const result = evaluate(state)
            expect(result).toBe('1')
        })
    })

    // Test formatOperand function
    describe('formatOperand', () => {
        it('should format integer correctly', () => {
            const result = formatOperand('1234567')
            expect(result).toBe('1,234,567')
        })

        it('should format decimal correctly', () => {
            const result = formatOperand('1234.567')
            expect(result).toBe('1,234.567')
        })

        it('should return ERROR unchanged', () => {
            const result = formatOperand('ERROR')
            expect(result).toBe('ERROR')
        })

        it('should return undefined for null input', () => {
            const result = formatOperand(null)
            expect(result).toBeUndefined()
        })
    })    
})