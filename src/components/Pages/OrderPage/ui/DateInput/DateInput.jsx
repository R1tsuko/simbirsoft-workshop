import { useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../Input/Input';
import './DatePicker.scss';

const DateInput = ({ labelText, placeholder }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<Input labelText={labelText} placeholder={placeholder} />}
      shouldCloseOnSelect={false}
      locale={ru}
      timeCaption="Время"
      dateFormat="Pp"
      fixedHeight
      showTimeSelect
    />
  );
};
export default DateInput;
