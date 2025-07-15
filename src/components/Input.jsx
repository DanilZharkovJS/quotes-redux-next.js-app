export default function Input({
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  touched,
  error,
  center,
  extraNote,
}) {
  return (
    <div className="flex-grow flex flex-col">
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`p-3 rounded ${center ? 'text-center' : ''} border border-yellow-400 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
      />
      {touched && error && (
        <p className="text-red-500 font-bold text-sm mt-1">{error}</p>
      )}
      {!touched && !error && extraNote && (
        <p className="font-bold ml-1">{extraNote}</p>
      )}
    </div>
  )
}
