export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manage your tokens, milestones, and bets
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* My Tokens */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-2xl font-semibold">My Tokens</h2>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <p className="text-muted-foreground">
              Your created tokens will appear here
            </p>
          </div>
        </div>

        {/* My Bets */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-2xl font-semibold">My Bets</h2>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <p className="text-muted-foreground">
              Your prediction market positions will appear here
            </p>
          </div>
        </div>
      </div>

      {/* Active Milestones */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-2xl font-semibold">Active Milestones</h2>
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
          <p className="text-muted-foreground">
            Your milestones will be tracked here
          </p>
        </div>
      </div>
    </div>
  );
}
