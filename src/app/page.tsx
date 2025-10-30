import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-[#35D07F] to-[#46CD85] bg-clip-text text-5xl font-bold text-transparent">
            Launch Your Builder Token
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Create tokens with human verification, set milestones, and enable
            community prediction markets on CELO blockchain.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/launch"
              className="rounded-lg bg-gradient-to-r from-[#35D07F] to-[#46CD85] px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl"
            >
              Launch Token
            </Link>
            <Link
              href="/explore"
              className="rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-muted"
            >
              Explore Tokens
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Human Verification</h3>
            <p className="text-muted-foreground">
              Powered by Self.xyz to ensure only verified humans can launch
              tokens.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-secondary/30 hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
              <svg
                className="h-6 w-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Milestone Tracking</h3>
            <p className="text-muted-foreground">
              Create transparent milestones and track your project progress
              on-chain.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/30 hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <svg
                className="h-6 w-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Prediction Markets</h3>
            <p className="text-muted-foreground">
              Enable your community to bet on milestone completion and success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
