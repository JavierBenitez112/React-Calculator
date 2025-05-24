import './display.css'


export default  function Display({ currentOperand, previousOperand, operator }) {    return (        <div className='display'>
            <h1 className='display-text' data-testid="display-current">{currentOperand || "0"}</h1>
            <h3 className='display-previous' data-testid="display-previous">{previousOperand} {operator}</h3>
        </div>
    )
}