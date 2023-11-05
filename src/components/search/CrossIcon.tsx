interface ICrossIconProps {
  clickHandler: () => void;
}

function CrossIcon({ clickHandler }: ICrossIconProps) {
  return (
    <div className="cross-icon">
      <h2 onClick={clickHandler}>&times;</h2>
    </div>
  );
}

export default CrossIcon;
