const Input = ({ id, label, type, helpText, placeholder, value, onChange }) => {
  return (
    <div className="mb-1 mt-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onChange}
        placeholder={placeholder}
        aria-describedby={`${id}-help`}
      />
      {helpText && (
        <div id={`${id}-help`} className="form-text">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default Input;
