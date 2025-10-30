export default function MilestoneDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Milestone Header */}
      <div className="mb-8 rounded-xl border border-border bg-card p-8">
        <div className="mb-4 inline-flex rounded-lg bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
          In Progress
        </div>
        <h1 className="text-4xl font-bold">Milestone Title</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Detailed description of the milestone and what needs to be achieved
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Target Date</p>
            <p className="mt-1 font-semibold">Dec 31, 2024</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Token</p>
            <p className="mt-1 font-semibold">MyToken (MTK)</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Milestone ID</p>
            <p className="mt-1 font-mono text-sm">{params.id}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Prediction Market */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-6 text-2xl font-semibold">Prediction Market</h2>

          {/* Market Stats */}
          <div className="mb-6 grid gap-4 rounded-lg bg-background p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Pool</span>
              <span className="font-semibold">1,250 CELO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">YES odds</span>
              <span className="font-semibold text-primary">65%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">NO odds</span>
              <span className="font-semibold text-destructive">35%</span>
            </div>
          </div>

          {/* Betting Interface */}
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <p className="text-muted-foreground">Betting interface coming soon</p>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-6 text-2xl font-semibold">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-background p-4"
              >
                <p className="text-sm">
                  <span className="font-mono text-xs text-muted-foreground">
                    0x123...abc
                  </span>{' '}
                  placed a bet
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {i} hour{i > 1 ? 's' : ''} ago
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
