import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const CustomDropdown = ({
  id,
  value,
  error,
  options,
  touched,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <select
        className="form-control py-3 mt-3"
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {capitalizeFirstLetter(option)}
            </option>
          );
        })}
      </select>
      <div className="error">
        {touched && error ? <div>{error}</div> : null}
      </div>
    </>
  );
};
export default CustomDropdown;
