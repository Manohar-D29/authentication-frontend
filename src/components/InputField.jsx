"use client";
const InputField = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
      placeholder={placeholder}
    />
    {error && <div className="text-sm text-red-500 px-2">{error}</div>}
  </div>
);

export default InputField;
