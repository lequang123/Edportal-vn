import { DatePicker as DatePickerAntd } from "antd";
import dayjs from 'dayjs';

const DatePicker = (props) => {
    let { value } = props || {};

    if (!dayjs.isDayjs(value)) {
        value = value && dayjs(value);
    }

    return (<DatePickerAntd
        {...props}
        value={value}
    />);
}

export default DatePicker