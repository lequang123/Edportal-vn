import * as React from 'react';


export default function InputWrapper(props) {
    const { title, isRequired, children, errorMessage } = props || {};

    const renderErrorMessage = () => {
        if (!isRequired || !errorMessage) return null;
        return isRequired && <span className={"text-red-600"} >{errorMessage}</span>
    }

    return <div className="input-wrapper form-group">
        <label>
            {title}
            {isRequired && <span className='mr-1 ml-1 text-red-600'>*</span>}
            {renderErrorMessage()}
        </label>

        <div className="input-item">
            {children}
        </div>
    </div >
}
