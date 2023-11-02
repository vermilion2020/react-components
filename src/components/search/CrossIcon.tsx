import crossIcon from '../../assets/cross-icon.png';

interface ICrossIconProps {
  clickHandler: () => void;
}

function CrossIcon({ clickHandler }: ICrossIconProps) {
  return (
    <img className="cross-icon" src={crossIcon} onClick={clickHandler}></img>
  );
}

export default CrossIcon;
