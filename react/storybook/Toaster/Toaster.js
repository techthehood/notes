const {toaster} = require('../../../lib/elements/toaster/toaster');
require('../../css/style.scss');
require('./Toaster.scss');

const Toaster = ({
  message = "sample message",
  label = "button",
  auto = true,
  duration = 5
}) => {
  const name = "toastSample";
  const home = ".toaster_home";
  const show_toast = () => {
    toaster({home, name, message, auto, sec: duration});
  }
  return (
    <div className={"toaster_wrapper hide-scroll"}>
      <div className="toaster_home"></div>
      <button className="toaster_btn w3-btn" onClick={show_toast}>{label}</button>
    </div>
  )
}

export default Toaster;
