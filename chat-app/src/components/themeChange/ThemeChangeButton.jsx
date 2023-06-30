import React, { useContext } from 'react';
import "./DarkMode.css";
import Moon from '../../assets/Moon.png';
import Sun from '../../assets/Sun.png';
import { ThemeContext } from '../context/ThemeContext';

const ThemeChangeButton = () => {
  const { value, setValue } = useContext(ThemeContext);

  const handleChange = () => {
    setValue(prevValue => !prevValue);
  };


  return (
    <div className={`dark_mode ${value ? 'dark_mode--active' : ''}`}>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        onChange={handleChange}
        checked={value}
      />
      <label className='dark_mode_label flex items-center justify-center gap-3.5' htmlFor='darkmode-toggle'>
        <img className='w-5 h-5 z-50' src={Moon} alt="Moon" />
        <img className='w-5 h-5 z-50' src={Sun} alt="Sun" />
      </label>
    </div>
  );
};

export default ThemeChangeButton;