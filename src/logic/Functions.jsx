import { useReducer, useEffect } from 'react'
import NumButton from '../Components/NumButton'
import './Calculator.css'
import { OpButton, OPERATOR_TYPES } from '../Components/OperationButton'
import Display from '../Components/display'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

export const ACTIONS = {
    ADD_NUMBER: 'add-number',
    CHOOSE_OPERATOR: 'choose-operator',
    CLEAR: 'clear',
    DELETE: 'delete',
    EVALUATE: 'evaluate',
    TOGGLE_SIGN: 'toggle-sign'
} 
export function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_NUMBER:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.number,
                    overwrite: false
                }
            }
            if (payload.number === "0" && state.currentOperand === "0") {
                return state
            }
            if (payload.number === "." && state.currentOperand.includes(".")) {
                return state
            }
            if ((state.currentOperand || "").length >= 9) {
                return state
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.number}`
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CHOOSE_OPERATOR:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operator: payload.operator
                }
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operator: payload.operator,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operator: payload.operator,
                currentOperand: null
            }
        case ACTIONS.EVALUATE:
            if (state.currentOperand == null || state.previousOperand == null || state.operator == null) {
                return state
            }
            if (state.operator === "-" && parseFloat(state.currentOperand) > parseFloat(state.previousOperand)) {
                return {
                    ...state,
                    overwrite: true,
                    previousOperand: null,
                    operator: null,
                    currentOperand: "ERROR"
                }
            }
            if(state.currentOperand.length > 9) {
                return {
                    ...state,
                    overwrite: false,
                    previousOperand: null,
                    operator: null,
                    currentOperand: "ERROR"
                }
            }
            return {
                ...state,
                previousOperand: null,
                operator: null,
                currentOperand: evaluate(state)
            }
        case ACTIONS.DELETE:
            if (state.overwrite || state.currentOperand === "ERROR") {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) {
                return state
            }
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.TOGGLE_SIGN:
            if (state.currentOperand == null) {
                return state
            }
            return {
                ...state,
                currentOperand: (-parseFloat(state.currentOperand)).toString()
            }
    }
}

export function evaluate({ currentOperand, previousOperand, operator }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return "ERROR"
    let computation = ""
    switch (operator) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "×":
            computation = prev * current
            break
        case "÷":
            if (current === 0) return "ERROR"
            computation = prev / current
            break
        case "%":
            if (current === 0) return "ERROR"
            computation = prev % current
            break
        default:
            return ""    }
    if (!isFinite(computation) || computation < 0) return "ERROR"
    const result = computation.toString()
    if (result.replace('.', '').length > 9) return "ERROR"
    return result
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})
export function formatOperand(operand) {
    if (operand == null) return
    if (operand === "Error" || operand === "ERROR") return operand
    
    // Convert to string if it's a number
    const stringOperand = operand.toString()
    const [integer, decimal] = stringOperand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const Functions = () => {
    const [{currentOperand, previousOperand, operator}, dispatch] = useReducer(
        reducer,
        {}
    )

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Numbers and decimal
            if (/^[0-9.]$/.test(e.key)) {
                dispatch({ type: ACTIONS.ADD_NUMBER, payload: { number: e.key } })
            }
            // Operators
            switch (e.key) {
                case '+':
                    dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '+' } })
                    break
                case '-':
                    dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '-' } })
                    break
                case '*':
                case 'x':
                    dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '×' } })
                    break
                case '/':
                    dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '÷' } })
                    break
                case '%':
                    dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '%' } })
                    break
                case 'Enter':
                case '=':
                    dispatch({ type: ACTIONS.EVALUATE })
                    break
                case 'Backspace':
                    dispatch({ type: ACTIONS.DELETE })
                    break
                case 'Escape':
                    dispatch({ type: ACTIONS.CLEAR })
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [])

    const handleACDELClick = () => {
        if (currentOperand != null) {
            dispatch({type: ACTIONS.DELETE})
        } else {
            dispatch({type: ACTIONS.CLEAR})
        }
    }

    return (
        <div className='calculator'>
            <Display currentOperand={formatOperand(currentOperand)} previousOperand={formatOperand(previousOperand)} operator={operator} />
            <div className='numpad'>                <button 
                    className='OperatorButtonAC' 
                    onClick={handleACDELClick}
                    aria-label={currentOperand != null ? 'Delete' : 'AC'}>
                    <span className='button-text'>
                        {currentOperand != null ? <FontAwesomeIcon icon={faDeleteLeft} /> : 'AC'}
                    </span>
                </button>
                <OpButton dispatch={dispatch} operator={"+/-"} type={OPERATOR_TYPES.TOP}/>
                <OpButton dispatch={dispatch} operator={"%"} type={OPERATOR_TYPES.TOP}/>
                <OpButton dispatch={dispatch} operator={"÷"} type={OPERATOR_TYPES.RIGHT} />
                <NumButton dispatch={dispatch} number={7} />
                <NumButton dispatch={dispatch} number={8} />        
                <NumButton dispatch={dispatch} number={9} />
                <OpButton dispatch={dispatch} operator={"×"} type={OPERATOR_TYPES.RIGHT} />
                <NumButton dispatch={dispatch} number={4} />
                <NumButton dispatch={dispatch} number={5} />
                <NumButton dispatch={dispatch} number={6} />
                <OpButton dispatch={dispatch} operator={"-"} type={OPERATOR_TYPES.RIGHT} />
                <NumButton dispatch={dispatch} number={1} />
                <NumButton dispatch={dispatch} number={2} />
                <NumButton dispatch={dispatch} number={3} />
                <OpButton dispatch={dispatch} operator={"+"} type={OPERATOR_TYPES.RIGHT} />
                <NumButton dispatch={dispatch} number={0} />
                <NumButton dispatch={dispatch} number={"."} />
                <button className='OperatorButtonEQ' onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
            </div>
        </div>
    )
}

export default Functions