interface CardProps {
  title: string;
  value: string;
  color: string;
}

export default function LeaveSummaryCard({ title, value, color }: CardProps) {
  return (
    <div className={`rounded-lg shadow p-4 ${color}`}>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
