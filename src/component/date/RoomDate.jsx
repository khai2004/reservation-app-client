import { addDays, setDate } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange } from 'react-date-range';
import './roomDate.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setReserveOrder } from '../../slices/ReserveSlice';

const RoomDate = () => {
  const [openDate, setOpenDate] = useState(false);
  const { dateNumber } = useSelector((state) => state.room);
  const [state, setState] = useState([
    {
      startDate: dateNumber[0] ? new Date(dateNumber[0]) : null,
      endDate: dateNumber[0]
        ? new Date(dateNumber[dateNumber.length - 1])
        : null,
      key: 'selection',
    },
  ]);
  const dispatch = useDispatch();

  const getAllDate = (startDate, endDate) => {
    const end = new Date(endDate);

    const date = new Date(new Date(startDate).getTime());

    const dateInRange = [];
    while (date.getDate() <= end.getDate()) {
      dateInRange.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dateInRange;
  };

  useEffect(() => {
    const allDateReservation = getAllDate(
      state[0]?.startDate,
      state[0]?.endDate
    );
    if (allDateReservation[0]) {
      dispatch(
        setReserveOrder({
          dateNumber: allDateReservation,
        })
      );
    }
  }, [state, dispatch]);

  const handleDate = () => {
    setOpenDate((date) => !date);
  };

  return (
    <div className='room-date-bar'>
      <div className='date' onClick={handleDate}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <div className='setDate'>
          <div>
            {' '}
            {state[0]?.endDate === null
              ? 'Check-in date'
              : state[0]?.startDate?.toDateString()}
          </div>
          <div>—</div>
          <div>
            {state[0]?.endDate === null
              ? 'Check-out date'
              : state[0]?.endDate?.toDateString()}
          </div>
        </div>
      </div>
      {openDate && (
        <div className='calendar'>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            minDate={addDays(new Date(), 1)}
          />
        </div>
      )}
    </div>
  );
};

export default RoomDate;
