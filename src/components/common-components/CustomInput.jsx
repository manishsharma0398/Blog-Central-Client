const CustomInput = ({
  id,
  type,
  label,
  value,
  error,
  touched,
  helpText,
  onChange,
  className,
  errorOnTop,
}) => {
  return (
    <>
      {errorOnTop && touched && error ? (
        <div className="text-danger">{error}</div>
      ) : null}

      <div className="form-floating mt-3 mb-1">
        <input
          id={id}
          name={id}
          value={value}
          placeholder={label}
          onChange={onChange}
          type={!type ? "text" : type}
          aria-describedby={`${id}-help`}
          className={`form-control ${className}`}
        />
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      </div>

      {helpText && (
        <div id={`${id}-help`} className="form-text">
          {helpText}
        </div>
      )}

      {!errorOnTop && touched && error ? (
        <div className="text-danger">{error}</div>
      ) : null}
    </>
  );
};
export default CustomInput;
