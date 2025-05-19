import { useState } from 'react'
import NumButton from '../Components/NumButton'
import './Calculator.css'
import { OpButton, OPERATOR_TYPES } from '../Components/OperationButton'

const Functions = () => {

    return (
    <div className='container'>        
        <OpButton dispatch={""} operator={"AC"} type={OPERATOR_TYPES.AC} />
        <NumButton dispatch={""} number={"+/-"} />
        <NumButton dispatch={""} number={"%"} />
        <OpButton dispatch={""} operator={"÷"} type={OPERATOR_TYPES.RIGHT} />
        <NumButton dispatch={""} number={7} />
        <NumButton dispatch={""} number={8} />        
        <NumButton dispatch={""} number={9} />
        <OpButton dispatch={""} operator={"×"} type={OPERATOR_TYPES.RIGHT} />
        <NumButton dispatch={""} number={4} />
        <NumButton dispatch={""} number={5} />
        <NumButton dispatch={""} number={6} />
        <OpButton dispatch={""} operator={"-"} type={OPERATOR_TYPES.RIGHT} />
        <NumButton dispatch={""} number={1} />
        <NumButton dispatch={""} number={2} />
        <NumButton dispatch={""} number={3} />
        <OpButton dispatch={""} operator={"+"} type={OPERATOR_TYPES.RIGHT} />
        <NumButton dispatch={""} number={0} />
        <NumButton dispatch={""} number={"."} />
        <OpButton dispatch={""} operator={"="} type={OPERATOR_TYPES.EQUAl} />
    </div>
    )
}

export default Functions