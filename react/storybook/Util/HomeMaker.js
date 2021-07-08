// const {toaster} = require('../../../lib/elements/toaster/toaster');
import {useRef} from 'react';
require('../../css/style.scss');
require('./HomeMaker.scss');

const HomeMaker = ({
  label = "button",
  show_btn = false,
  home : h_val = "home_maker",
  orient = "row",
  children
}) => {
  const iUN_ref = useRef(Math.round(Math.random() * 10000))
  const iUN = iUN_ref.current;

  const name = "homeMaker";
  const home_txt = h_val;
  const home = `.${home_txt}_${iUN}`;
  const run_fn = () => {
    // toaster({home, name, message, auto, sec: duration});
  }
  return (
    <div className={`hm_wrapper hide-scroll ${orient}`}>
      <div className={`${home_txt}_${iUN} ${home_txt} home_maker`}></div>
      {show_btn ? <button className="hm_btn w3-btn" onClick={run_fn}>{label}</button> : null}
      {children}
    </div>
  )
}// Toaster

export default HomeMaker;
