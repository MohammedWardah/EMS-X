const SummaryCardHorizontal = ({ icon, label, value }) => (
  <div
    className="flex-shrink-0 w-45 h-45 bg-[#171c23] rounded-full  p-5 flex flex-col items-center justify-center shadow-lg gap-2"
    style={{ border: "1px solid #a7ee43d7" }}
  >
    <div className="mb-1">{icon}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-gray-400 text-sm mt-1">{label}</div>
  </div>
);

export default SummaryCardHorizontal;
