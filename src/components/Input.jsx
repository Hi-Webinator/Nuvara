const Input = ({ type, ph }) => {
  return (
    <div>
      <input
        type={type}
        className="form-control mainInput mb-4 w-100 ps-0"
        placeholder={ph}
        aria-label={ph}
        required
      />
    </div>
  );
};

export default Input;
