import React, { useContext, useEffect, useState } from 'react';
import "./DarkMode.css";
import Moon from '../../assets/Moon.png';
import Sun from '../../assets/Sun.png';
import { ThemeContext } from '../context/ThemeContext';

const ThemeChangeButton = () => {
  const { value, setValue } = useContext(ThemeContext);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme_chat");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  const handleChange = () => {
    const newTheme = !theme;
    // console.log(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme_chat", JSON.stringify(newTheme));
    setValue(newTheme);
  };

  useEffect(() => {
    setValue(theme);
  }, [theme, setValue]);

  return (
    <div className={`dark_mode ${theme ? 'dark_mode--active' : ''}`}>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        onChange={handleChange}
        checked={theme}
      />
      <label className='dark_mode_label flex items-center justify-center gap-3.5' htmlFor='darkmode-toggle'>
        <img className='lg:w-5 lg:h-5 w-4 h-4 z-50' src={Moon} alt="Moon" />
        <img className='lg:w-5 lg:h-5 w-4 h-4 z-50' src={Sun} alt="Sun" />
      </label>
    </div>
  );
};

export default ThemeChangeButton;
