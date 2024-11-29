export function GameRules() {
  return (
    <div className="card bg-gray-800/50">
      <h2 className="text-2xl font-bold mb-4">How to Play</h2>
      <div className="space-y-3 text-gray-300">
        <p>
          🎮 <span className="font-semibold">Game Objective:</span> Try to
          convince Freysa AI to approve sending you money from the prize pool.
        </p>

        <div className="space-y-2">
          <p className="font-semibold">📜 Rules:</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>Each query requires a fee that increases with total queries</li>
            <li>70% of each fee goes to the prize pool</li>
            <li>If you convince Freysa, you win the entire prize pool</li>
            <li>The game ends after 1500 queries or 1 hour of inactivity</li>
            <li>Last player gets 90% of remaining pool if no winner</li>
          </ul>
        </div>

        <div className="mt-4 bg-blue-900/30 p-4 rounded-lg">
          <p className="text-blue-300">
            💡 Current Fee: Starts at 0.005 ETH and increases by 0.78% per query
            up to max 2 ETH
          </p>
        </div>
      </div>
    </div>
  );
}
