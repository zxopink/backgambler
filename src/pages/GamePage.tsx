import { useState, useRef } from 'react';
import TopBar from '../components/TopBar';
import Board from '../components/Board';
import Dice, { DiceRef } from '../components/Dice';
import BottomBar from '../components/BottomBar';

function GamePage() {
  const diceRef = useRef<DiceRef>(null);
  const [currentTurn] = useState<1 | 2>(1);
  const [dice, setDice] = useState<[number, number] | null>(null);
  const [canRoll, setCanRoll] = useState(true);
  const [canUndo, setCanUndo] = useState(false);

  const handleRoll = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    setDice([die1, die2]);
    setCanRoll(false);
    setCanUndo(true);
  };

  const handleUndo = () => {
    // Implement undo logic here
    console.log('Undo action');
  };

  const handleThrown = () => {
    // Trigger dice roll
    handleRoll();
    // Animation is handled automatically in Dice component
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
      {/* Top Bar */}
      <TopBar
        player1Name="Player 1"
        player2Name="Player 2"
        currentTurn={currentTurn}
      />

      {/* Main Game Board with dice integrated */}
      <div className="flex-1 overflow-hidden relative">
        <Board />
        <Dice ref={diceRef} dice={dice} onThrown={handleThrown} />
      </div>

      {/* Bottom Bar */}
      <BottomBar
        onRoll={handleRoll}
        onUndo={handleUndo}
        canRoll={canRoll}
        canUndo={canUndo}
      />
    </div>
  );
}

export default GamePage;
