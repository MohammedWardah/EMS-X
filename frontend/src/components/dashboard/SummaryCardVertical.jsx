const SummaryCardVertical = ({ icon, label, value }) => (
  <div className="flex-1 min-w-[200px]  bg-[#171C23] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg h-32">
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-bold text-gray-200">{value}</div>
    <div className="text-gray-400 text-base text-sm mt-2">{label}</div>
  </div>
);

export default SummaryCardVertical;
