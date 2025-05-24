import classes from './btn.module.css'
import { ACTIONS } from '../logic/Functions'

export const OPERATOR_TYPES = {
    DEFAULT: 'default',
    TOP: 'top',
    RIGHT: 'right',
    AC: 'ac',
    EQUAl: 'equal'
};

export function OpButton({ dispatch, operator, type = OPERATOR_TYPES.DEFAULT }) {
    const getButtonClass = () => {
        switch (type) {
            case OPERATOR_TYPES.TOP:
                return classes.OperatorButtonTop;
            case OPERATOR_TYPES.RIGHT:
                return classes.OperatorButtonRight;
            case OPERATOR_TYPES.AC:
                return classes.OperatorButtonAC;
            case OPERATOR_TYPES.EQUAl:
                return classes.OperatorButtonEQ;
            default:
                return classes.OperatorButton;
        }
    };    const handleClick = () => {
        if (operator === "+/-") {
            dispatch({ type: ACTIONS.TOGGLE_SIGN });
        } else {
            dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: {operator} });
        }
    };

    return (
        <button className={getButtonClass()} onClick={handleClick}>
            {operator}
        </button>
    );
}

export function ACButton({ operator }) {
    return (
        <div>
            <button className={`${classes.OperatorButtonAC}`} onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
                {operator}
            </button>
        </div>
    )
}