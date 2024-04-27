import { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import buttonIcon from './icon-arrow.svg'



function Calculator() {
  const currentDate = new Date();
  const currentYear =currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDay();

  const [birthYear, setBirthYear] = useState(currentYear);
  const [birthMonth, setBirthMonth] = useState(currentMonth);
  const [birthDay, setBirthDay] = useState(currentDay);

  const [ageYears, setAgeYears] = useState("--");
  const [ageMonths, setAgeMonths] = useState("--");
  const [ageDays, setAgeDays] = useState("--");

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

  const handleDay = (e) => {
    setBirthDay(e.target.value)
    
  }

  const handleMonth = (e) => {
    setBirthMonth(e.target.value)
  }

  const handleYear = (e) => {
    setBirthYear(e.target.value)
  }

  const handleSubmit = (e) => {
    if ((birthMonth === '4' || birthMonth === '6' || birthMonth === '9' || birthMonth === '11') && birthDay > 30) {
      e.target[0].setCustomValidity("Invalid date.");
      e.target[0].reportValidity();
    }else if (birthMonth === 2) {
        if ((isLeapYear(birthYear) && birthDay > 29) || (!isLeapYear(birthYear) && birthDay > 28)){
      e.target[0].setCustomValidity("Invalid date.");
      e.target[0].reportValidity();}
    } else {
      var birthDate = new Date(birthYear, birthMonth - 1, birthDay);
      var amountOfDays = differenceInDays(currentDate, birthDate);
      var diffYear = 0;
      var diffMonth = 0;
      var diffDay = 0;
      while (amountOfDays > 365) {
        diffYear += 1;
        amountOfDays -= 365;
      } while (amountOfDays > 30) {
        diffMonth += 1;
        amountOfDays -= 30;
      } diffDay = amountOfDays;

      setAgeYears(diffYear);
      setAgeMonths(diffMonth);
      setAgeDays(diffDay);
    }    

    e.preventDefault();
    e.target.reset();
  }

  
  

  return (
    <div className="container">
      <section className="input">
        <form className="user-birthday" onSubmit={e => handleSubmit(e)}>
          <div className="form-inputs">
            <label htmlFor="birth-day" className="label">
              <h2>DAY</h2>
              <input type="number" id="birth-day" min="1" max="31" required onChange={e => handleDay(e)} placeholder='DD' />
            </label>
            <label htmlFor="birth-month" className="label">
              <h2>MONTH</h2>
              <input type="number" id="birth-month" min="1" max="12" required onChange={e => handleMonth(e)} placeholder='MM' />
            </label>
            <label htmlFor="birth-year" className="label">
              <h2>YEAR</h2>
              <input type="number" id="birth-year" min="1" max={currentYear} required onChange={e => handleYear(e)} placeholder='YYYY' />
            </label>
          </div>
          <div className="submit">
            <hr />
            <button type="submit"><img src={buttonIcon} /></button>
          </div>
        </form>
      </section>
      <section className="output">
        <h1><span className='comma'>{ageYears}</span> years</h1>
        <h1><span className='comma'>{ageMonths}</span> months</h1>
        <h1><span className='comma'>{ageDays}</span> days</h1>
      </section>
    </div>
  );
}

export default Calculator;