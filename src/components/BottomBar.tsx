interface BottomBarProps {
  onRoll: () => void;
  onUndo: () => void;
  canRoll: boolean;
  canUndo: boolean;
}

function BottomBar({ onRoll, onUndo, canRoll, canUndo }: BottomBarProps) {
  return (
    <div className="w-full bg-gray-100 border-t border-gray-300 px-3 sm:px-4 py-3">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="px-4 py-2 text-sm sm:text-base bg-gray-200 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Undo
          </button>
          <button
            onClick={onRoll}
            disabled={!canRoll}
            className="px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Roll
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
