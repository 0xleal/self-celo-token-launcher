import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 CELO Token Launcher. Built on CELO blockchain.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://docs.celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              CELO Docs
            </Link>
            <Link
              href="https://docs.self.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Self.xyz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
