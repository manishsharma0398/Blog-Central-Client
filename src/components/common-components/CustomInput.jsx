const CustomInput = ({
  type,
  label,
  className,
  id,
  value,
  onChange,
  error,
  touched,
}) => {
  return (
    <>
      <div className="form-floating mt-3 mb-1">
        <input
          type={!type ? "text" : type}
          className={`form-control ${className}`}
          id={id}
          name={id}
          placeholder={label}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      </div>

      {touched && error ? <div className="text-danger">{error}</div> : null}
    </>
  );
};
export default CustomInput;
