export default function Toast({ message, type, onClose }) {
  const colors = {
    error:   "bg-red-50 border-red-200 text-red-700",
    success: "bg-green-50 border-green-200 text-green-700",
    info:    "bg-sky-50 border-sky-200 text-sky-700",
  };
  const icons = { error: "❌", success: "✅", info: "ℹ️" };

  return (
    <div className={`fixed top-20 right-4 z-[100] flex items-start gap-3 px-5 py-4 rounded-2xl border shadow-xl max-w-sm fade-up ${colors[type]}`}>
      <span>{icons[type]}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="text-lg leading-none opacity-50 hover:opacity-100 ml-2">×</button>
    </div>
  );
}