import { Input as InputAntd, InputProps } from "antd";

const Input = (props) => {
    const { placeholder, allowClear, autoComplete, name, onChange } = props || {};
    return (<InputAntd
        {...props}
        placeholder={placeholder ? placeholder : `Input ${(name || "")}`}
        allowClear={allowClear === undefined ? true : allowClear}
        autoComplete={autoComplete === undefined ? "off" : autoComplete}
    />);
}

export default Input