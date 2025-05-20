import './display.css'

/*The textfield will be an array of numbres that accept the values being inputed from the numpad in the calculator */

export default  function Display({ value }) {
    return (
        <div className='display'>
            <h1 className='display-text'>{"0"}</h1>
        </div>
    )
}