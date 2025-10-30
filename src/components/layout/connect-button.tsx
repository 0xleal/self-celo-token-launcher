'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';
import { ChevronDown, Copy, ExternalLink, LogOut, Wallet } from 'lucide-react';

export function ConnectButton() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // Could add a toast notification here
    }
  };

  const openExplorer = () => {
    if (address && chain?.blockExplorers?.default) {
      window.open(
        `${chain.blockExplorers.default.url}/address/${address}`,
        '_blank'
      );
    }
  };

  // Not connected state
  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowConnectors(!showConnectors)}
          className="flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 font-medium text-primary transition-all hover:bg-primary/10"
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </button>

        {/* Connector Selection Dropdown */}
        {showConnectors && (
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg">
            <div className="p-2">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    setShowConnectors(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
                >
                  <Wallet className="h-4 w-4" />
                  {connector.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Connected state
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary transition-all hover:bg-primary/20"
      >
        <div className="h-2 w-2 rounded-full bg-primary" />
        <span className="font-mono text-sm">{formatAddress(address!)}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Account Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg">
          <div className="p-2">
            {/* Network */}
            <div className="mb-2 rounded-lg bg-muted px-4 py-2">
              <p className="text-xs text-muted-foreground">Network</p>
              <p className="font-medium">{chain?.name || 'Unknown'}</p>
            </div>

            {/* Address */}
            <div className="mb-2 rounded-lg bg-muted px-4 py-2">
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="font-mono text-sm">{formatAddress(address!)}</p>
            </div>

            {/* Actions */}
            <div className="space-y-1">
              <button
                onClick={copyAddress}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-sm transition-colors hover:bg-muted"
              >
                <Copy className="h-4 w-4" />
                Copy Address
              </button>
              <button
                onClick={openExplorer}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-sm transition-colors hover:bg-muted"
              >
                <ExternalLink className="h-4 w-4" />
                View on Explorer
              </button>
              <button
                onClick={() => {
                  disconnect();
                  setShowDropdown(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
