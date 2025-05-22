const SummaryCard = ({ icon, text, number }) => (
  <div className="flex flex-col items-center justify-center bg-[#171c23] rounded-2xl shadow p-5 min-h-[170px]">
    {icon}
    <div className="text-2xl font-bold text-[#e5e7eb]">{number}</div>
    <div className="text-gray-400 text-sm mt-1 text-center">{text}</div>
  </div>
);

export default SummaryCard;
