import classes from './btn.module.css'

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
                return classes.OperatorButtonAC;
            default:
                return classes.OperatorButton;
        }
    };

    return (
        <div>
            <button 
                className={getButtonClass()} 
                onClick={() => dispatch({ type: '', payload: { operator } })}
            >
                {operator}
            </button>
        </div>
    );
}
