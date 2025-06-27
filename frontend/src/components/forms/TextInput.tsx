interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

export default function TextInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: TextInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded px-3 py-2"
        required={required}
      />
    </div>
  );
}
