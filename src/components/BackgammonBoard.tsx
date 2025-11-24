import './BackgammonBoard.css';

function BackgammonBoard() {
  // Backgammon board has 24 points (triangles)
  const points = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="board-wrapper">
      <div className="game-panel">
        <div className="backgammon-board">
          {/* Top half of the board */}
          <div className="board-half top">
            <div className="board-quarter">
              {points.slice(12, 18).reverse().map((point) => (
                <div key={point} className={`point ${point % 2 === 0 ? 'dark' : 'light'}`}>
                  <div className="point-number">{point}</div>
                </div>
              ))}
            </div>
            <div className="bar"></div>
            <div className="board-quarter">
              {points.slice(18, 24).reverse().map((point) => (
                <div key={point} className={`point ${point % 2 === 0 ? 'dark' : 'light'}`}>
                  <div className="point-number">{point}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle divider */}
          <div className="board-middle"></div>

          {/* Bottom half of the board */}
          <div className="board-half bottom">
            <div className="board-quarter">
              {points.slice(6, 12).map((point) => (
                <div key={point} className={`point ${point % 2 === 0 ? 'dark' : 'light'}`}>
                  <div className="point-number">{point}</div>
                </div>
              ))}
            </div>
            <div className="bar"></div>
            <div className="board-quarter">
              {points.slice(0, 6).map((point) => (
                <div key={point} className={`point ${point % 2 === 0 ? 'dark' : 'light'}`}>
                  <div className="point-number">{point}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="game-controls">
          <button className="btn-roll">Roll Dice</button>
          <div className="dice-display">
            <div className="die">?</div>
            <div className="die">?</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgammonBoard;
