import classes from './btn.module.css'
import { ACTIONS } from '../logic/Functions'


export default function NumButton({ dispatch, number }) {
    return (
        <div>
            <button className={`${classes.NumbersButton}`} onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: {number} })}>
                {number}
            </button>
        </div>
    )
}