export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Explore Tokens</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover builder tokens and track their progress
        </p>
      </div>

      {/* Search and filters will go here */}
      <div className="mb-8 rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Search and filter options coming soon
        </p>
      </div>

      {/* Token grid will go here */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold">Sample Token {i}</h3>
                <p className="font-mono text-sm text-muted-foreground">STK{i}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Token cards will display real data from blockchain
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
