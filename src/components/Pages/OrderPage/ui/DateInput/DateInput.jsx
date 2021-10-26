import DatePicker from 'react-datepicker';
import { useState } from 'react';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../Input/Input';
import './DatePicker.scss';

const DateInput = ({ labelText, placeholder, pickedDate, onPickDate, minDate, maxDate }) => {
  const [date, setDate] = useState(pickedDate);
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <DatePicker
      selected={date}
      minDate={minDate}
      maxDate={maxDate}
      filterTime={filterPassedTime}
      onChange={(newDate) => setDate(newDate)}
      onCalendarClose={() => onPickDate(date)}
      customInput={<Input labelText={labelText} />}
      placeholderText={placeholder}
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
