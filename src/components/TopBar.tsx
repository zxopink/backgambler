interface TopBarProps {
  player1Name: string;
  player2Name: string;
  currentTurn: 1 | 2;
}

function TopBar({ player1Name, player2Name, currentTurn }: TopBarProps) {
  return (
    <div className="w-full bg-gray-100 border-b border-gray-300 px-3 sm:px-4 py-2.5">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between gap-3 sm:gap-4">
        <div
          className={`flex-1 text-left text-sm sm:text-base ${
            currentTurn === 1 ? 'font-semibold text-gray-900' : 'text-gray-600'
          }`}
        >
          {player1Name}
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[11px] text-gray-500 leading-none">Turn</div>
          <div
            className={`w-3 h-3 rounded-full transition-colors ${
              currentTurn === 1 ? 'bg-blue-500' : 'bg-red-500'
            }`}
          />
        </div>

        <div
          className={`flex-1 text-right text-sm sm:text-base ${
            currentTurn === 2 ? 'font-semibold text-gray-900' : 'text-gray-600'
          }`}
        >
          {player2Name}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
