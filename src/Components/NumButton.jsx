import classes from './btn.module.css'


export default function NumButton({ dispatch, number }) {
    return (
        <div>
            <button className={`${classes.NumbersButton}`} onClick={() => dispatch({ type: '', payload: {number} })}>
                {number}
            </button>
        </div>
    )
}