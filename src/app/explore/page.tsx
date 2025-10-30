"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Rocket, Target, TrendingUp, Clock } from "lucide-react";
import { TOKEN_CONSTANTS } from "@/types";

interface TokenCard {
  address: string;
  ticket: string;
  creator: string;
  createdAt: number;
  totalMilestones: number;
  completedMilestones: number;
  activeBets: number;
}

// Mock data - replace with actual blockchain/API data
const MOCK_TOKENS: TokenCard[] = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    ticket: "ALICE",
    creator: "0x742d35...95f0bEb",
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    totalMilestones: 5,
    completedMilestones: 3,
    activeBets: 12,
  },
  {
    address: "0x1234567890123456789012345678901234567890",
    ticket: "BOB",
    creator: "0x123456...7890",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    totalMilestones: 3,
    completedMilestones: 1,
    activeBets: 8,
  },
  {
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    ticket: "CAROL",
    creator: "0xabcdef...fabcd",
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    totalMilestones: 8,
    completedMilestones: 7,
    activeBets: 25,
  },
  {
    address: "0x9876543210987654321098765432109876543210",
    ticket: "DEV123",
    creator: "0x987654...3210",
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    totalMilestones: 2,
    completedMilestones: 0,
    activeBets: 5,
  },
  {
    address: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
    ticket: "BUILDER",
    creator: "0xdeadbe...dbeef",
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    totalMilestones: 10,
    completedMilestones: 8,
    activeBets: 30,
  },
  {
    address: "0x1111222233334444555566667777888899990000",
    ticket: "MAKER",
    creator: "0x111122...9000",
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    totalMilestones: 4,
    completedMilestones: 1,
    activeBets: 6,
  },
];

type SortOption = "newest" | "oldest" | "most-milestones" | "best-track-record";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Filter and sort tokens
  const filteredTokens = useMemo(() => {
    let filtered = MOCK_TOKENS.filter((token) => {
      const query = searchQuery.toLowerCase();
      return (
        token.ticket.toLowerCase().includes(query) ||
        token.address.toLowerCase().includes(query) ||
        token.creator.toLowerCase().includes(query)
      );
    });

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "most-milestones":
        filtered.sort((a, b) => b.totalMilestones - a.totalMilestones);
        break;
      case "best-track-record":
        filtered.sort((a, b) => {
          const aRate = a.totalMilestones > 0 ? a.completedMilestones / a.totalMilestones : 0;
          const bRate = b.totalMilestones > 0 ? b.completedMilestones / b.totalMilestones : 0;
          return bRate - aRate;
        });
        break;
    }

    return filtered;
  }, [searchQuery, sortBy]);

  const getCompletionRate = (token: TokenCard) => {
    if (token.totalMilestones === 0) return 0;
    return Math.round((token.completedMilestones / token.totalMilestones) * 100);
  };

  const getTimeAgo = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / (24 * 60 * 60 * 1000));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months === 1) return "1 month ago";
    return `${months} months ago`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Explore Tokens</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover builder tokens and track their progress
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by ticket, address, or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <Button
              variant={sortBy === "newest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("newest")}
            >
              Newest
            </Button>
            <Button
              variant={sortBy === "best-track-record" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("best-track-record")}
            >
              Best Track Record
            </Button>
            <Button
              variant={sortBy === "most-milestones" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("most-milestones")}
            >
              Most Active
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          {filteredTokens.length} token{filteredTokens.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Token Grid */}
      {filteredTokens.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border py-12 text-center">
          <p className="text-muted-foreground">No tokens found matching your search</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTokens.map((token) => (
            <Link
              key={token.address}
              href={`/token/${token.address}`}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono text-lg font-bold">{token.ticket}</h3>
                      {getCompletionRate(token) >= 80 && (
                        <Badge className="bg-primary text-xs">High Trust</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{TOKEN_CONSTANTS.name}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span>Milestones</span>
                  </div>
                  <div className="font-semibold">
                    {token.completedMilestones} / {token.totalMilestones}
                  </div>
                </div>

                {/* Completion Progress Bar */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Track Record</span>
                    <span className="font-medium">{getCompletionRate(token)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${getCompletionRate(token)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>Active Bets</span>
                  </div>
                  <div className="font-semibold">{token.activeBets}</div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{getTimeAgo(token.createdAt)}</span>
                  </div>
                  <span className="font-mono">{token.creator}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
