import React, { useState, useRef, useEffect } from 'react';

import Register from './Register';

import { JngProvider } from '../../../../jngContext';
const jngStore = require('../../../../jngStore').default;

const { landing_data } = require('../../../../jng');

const display_console = false;

/**
 *@DOCS this connects to modal_home and register-btn found in Hero.hbs
 */
const RegisterMe = ({
  delay = 4,
  reg_btn = ".register-btn",
  links_btn = '.links-btn',
}) => {

  const store = jngStore;

  const registration = (params) => {
    ReactDOM.render(
      <JngProvider>
        <Register />
      </JngProvider>,
      document.querySelector('.modal_home')
    );
  }// registration

  const bioList = (params) => {
    ReactDOM.render(
      <JngProvider>
        <Biolist />
      </JngProvider>,
      document.querySelector('.modal_home')
    );
  }// bioList

  const [init, setInit] = useState(false);
  const [val, setVal] = useState(0); // integer state
  const forceUpdate = () => {
    setVal(val => ++val); // update the state to force render
  }// forceUpdate

  const delay_count = useRef(0);
  useEffect(() => {
    if (typeof delay != "undefined" && delay_count.current < delay) {
      delay_count.current = delay_count.current + 1;
      if (display_console || false) console.warn(`[Exporter] ${delay_count.current} delay. Ah, Ah, Ah`);
      forceUpdate();
    } else if (delay_count.current == delay && init == false) {
      if (typeof initialize != "undefined") initialize();
      setInit(true);
    }
  }, [delay_count.current]);

  const initialize = () => {

    // window.onload = (event) => { // FAIL
    window.addEventListener('load', (event) => { // WORKS
      console.log('page is fully loaded');
      let register_btn = document.querySelectorAll(reg_btn);// NodeList []
      // let register_btn = document.querySelectorAll('.register-now-btn');

      // Array.from()

      // if(register_btn.length > 0){}// not needed 
      register_btn.forEach((entry) => {
        entry.addEventListener('click', registration);
      })

      let links_btn = document.querySelectorAll(links_btn);// NodeList []
      // let register_btn = document.querySelectorAll('.register-now-btn');

      // Array.from()

      // if(register_btn.length > 0){}// not needed 
      links_btn.forEach((entry) => {
        entry.addEventListener('click', bioList);
      });
    });
  }

  return null;
}// RegisterMe

export default RegisterMe