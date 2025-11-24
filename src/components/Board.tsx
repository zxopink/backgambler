import Checker from './Checker';

interface Point {
  id: number;
  checkers: number;
  owner: 1 | 2 | null;
}

function Board() {
  const initialPoints: Point[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    checkers: 0,
    owner: null,
  }));

  // Standard backgammon starting position
  initialPoints[0] = { id: 1, checkers: 2, owner: 2 };
  initialPoints[5] = { id: 6, checkers: 5, owner: 1 };
  initialPoints[7] = { id: 8, checkers: 3, owner: 1 };
  initialPoints[11] = { id: 12, checkers: 5, owner: 2 };
  initialPoints[12] = { id: 13, checkers: 5, owner: 1 };
  initialPoints[16] = { id: 17, checkers: 3, owner: 2 };
  initialPoints[18] = { id: 19, checkers: 5, owner: 2 };
  initialPoints[23] = { id: 24, checkers: 2, owner: 1 };

  const renderPoint = (point: Point, isTop: boolean) => {
    const isLightTriangle = point.id % 2 === 0;
    const triangleGradient = isLightTriangle
      ? 'from-[#f6d6a1] via-[#e7b774] to-[#d79e54]'
      : 'from-[#7a3b16] via-[#5c240c] to-[#3f1607]';
    const directionClass = isTop ? 'bg-gradient-to-b' : 'bg-gradient-to-t';

    return (
      <div
        key={point.id}
        className="relative flex flex-col items-center h-full"
        style={{ width: 'calc(100% / 6)' }}
      >
        <div className={`relative w-full h-full ${isTop ? 'flex items-start' : 'flex items-end'}`}>
          <div
            className={`w-full h-[90%] ${directionClass} ${triangleGradient} border-l border-r border-amber-950/25`}
            style={{
              clipPath: isTop
                ? 'polygon(50% 100%, 0 0, 100% 0)'
                : 'polygon(50% 0, 0 100%, 100% 100%)',
            }}
          />
        </div>

        {point.checkers > 0 && (
          <div
            className={`absolute ${isTop ? 'top-1' : 'bottom-1'} flex ${
              isTop ? 'flex-col' : 'flex-col-reverse'
            } items-center gap-0.5 sm:gap-1`}
          >
            {Array.from({ length: Math.min(point.checkers, 5) }).map((_, i) => (
              <Checker
                key={i}
                variant={point.owner === 1 ? 'light' : 'dark'}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
            ))}
            {point.checkers > 5 && (
              <div className="text-[10px] font-semibold text-amber-50 bg-neutral-900/80 rounded px-1.5 shadow-sm">
                +{point.checkers - 5}
              </div>
            )}
          </div>
        )}

        <div
          className={`absolute left-1/2 -translate-x-1/2 text-[10px] tracking-[0.08em] font-semibold text-amber-900/50 ${
            isTop ? 'bottom-2' : 'top-2'
          }`}
        >
          {point.id}
        </div>
      </div>
    );
  };

  const topLeft = initialPoints.slice(12, 18).reverse();
  const topRight = initialPoints.slice(18, 24).reverse();
  const bottomLeft = initialPoints.slice(0, 6);
  const bottomRight = initialPoints.slice(6, 12);

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 bg-gradient-to-br from-slate-900/50 via-slate-900/20 to-slate-900/10">
      <div className="w-full max-w-5xl aspect-[3/2] relative">
        <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-amber-900/30 bg-gradient-to-br from-[#f6eddc] via-[#f0e0c2] to-[#e6d2ac] shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
          <div className="absolute inset-3 sm:inset-5 md:inset-6 bg-gradient-to-b from-[#f8eed8] via-[#f3e3c5] to-[#ebd5b0] border border-amber-900/15 rounded-[24px] overflow-hidden flex flex-col">
            {/* Center bar */}
            <div className="absolute inset-y-0 left-1/2 w-6 sm:w-7 md:w-8 -translate-x-1/2 bg-gradient-to-b from-amber-900/85 via-amber-900/75 to-amber-800/85 border-x border-amber-950/40 shadow-inner flex items-center justify-center z-10">
              <span className="text-[10px] tracking-[0.28em] text-amber-50/70 font-semibold rotate-90"></span>
            </div>

            {/* Top half */}
            <div className="flex-1 flex px-2 sm:px-4 md:px-5 pt-2 sm:pt-4 md:pt-5">
              <div className="flex-1 flex gap-[2px] sm:gap-1">
                {topLeft.map((point) => renderPoint(point, true))}
              </div>

              <div className="w-6 sm:w-7 md:w-8" />

              <div className="flex-1 flex gap-[2px] sm:gap-1">
                {topRight.map((point) => renderPoint(point, true))}
              </div>
            </div>

            {/* Bottom half */}
            <div className="flex-1 flex px-2 sm:px-4 md:px-5 pb-2 sm:pb-4 md:pb-5">
              <div className="flex-1 flex gap-[2px] sm:gap-1">
                {bottomLeft.map((point) => renderPoint(point, false))}
              </div>

              <div className="w-6 sm:w-7 md:w-8" />

              <div className="flex-1 flex gap-[2px] sm:gap-1">
                {bottomRight.map((point) => renderPoint(point, false))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
