interface TextareaInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}

export default function TextareaInput({
  label,
  name,
  value,
  onChange,
  rows = 3,
  required = false,
}: TextareaInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="border rounded px-3 py-2"
        required={required}
      />
    </div>
  );
}
