import useToggle from "../../hooks/useToggleState";

export default function Choice({ text, defaultChecked=false }) {
    const [state, toggle] = useToggle(defaultChecked);
    return (
        <div className='form form__choice'>
            <div 
                className={`form__choice--label choice-label-${state && 'active'}`}
                onClick={toggle}
            />
            <h4 className='subtitle'>{text}</h4>
        </div>
    );
}