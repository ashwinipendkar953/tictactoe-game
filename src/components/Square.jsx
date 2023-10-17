/* eslint-disable react/prop-types */
const Square = ({ value, onClick }) => {
  return (
    <div>
      <button type="button" className="square" onClick={onClick}>
        {value}
      </button>
    </div>
  );
};

export default Square;
