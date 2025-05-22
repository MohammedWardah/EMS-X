const SummaryCardVertical = ({ icon, label, value }) => (
  <div className="flex-1 min-w-[200px] max-w-[320px] bg-[#171C23] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
    <div className="mb-2">{icon}</div>
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="text-gray-400 text-base mt-2">{label}</div>
  </div>
);

export default SummaryCardVertical;
