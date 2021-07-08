import './Center.css';
require('../../css/style.scss');

const Center = (props) => {
  return (
    <div className="center storybook-center">
      {props.children}
    </div>
  )
}

export default Center;
