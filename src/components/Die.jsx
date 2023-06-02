/* eslint-disable react/prop-types */
const Die = (props) => {
    const className = props.inHeld ? "die-btn selected btn" : " die-btn btn"
    
    return (
        <button type="button" className={className} onClick={props.holdDice}>
            {props.value}
        </button>    
    )
}

export default  Die