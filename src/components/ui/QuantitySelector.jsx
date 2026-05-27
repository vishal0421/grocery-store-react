const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-200">
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
          value <= min
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-primary hover:text-white hover:shadow-md active:scale-95'
        }`}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <span className="w-8 md:w-12 text-center font-semibold text-gray-900 text-sm md:text-base">
        {value}
      </span>
      
      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
          value >= max
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-primary hover:text-white hover:shadow-md active:scale-95'
        }`}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;
