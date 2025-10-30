"use client";

import { useState, use } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Plus, Rocket } from "lucide-react";
import { MilestoneCard } from "@/components/token/milestone-card";
import { CreateMilestoneModal } from "@/components/token/create-milestone-modal";
import { Milestone, MilestoneStatus, TOKEN_CONSTANTS } from "@/types";

export default function TokenDetailPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const resolvedParams = use(params);
  const { address: userAddress } = useAccount();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - replace with actual blockchain/API data
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      tokenAddress: resolvedParams.address as `0x${string}`,
      title: "Launch MVP on Testnet",
      description: "Deploy the first working version to Celo testnet with basic features",
      targetDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      status: MilestoneStatus.PENDING,
      creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" as `0x${string}`,
      createdAt: Date.now(),
      totalYesStake: BigInt(100e18),
      totalNoStake: BigInt(50e18),
    },
    {
      id: "2",
      tokenAddress: resolvedParams.address as `0x${string}`,
      title: "Reach 100 Active Users",
      description: "Achieve 100 daily active users on the platform",
      targetDate: Date.now() + 60 * 24 * 60 * 60 * 1000, // 60 days from now
      status: MilestoneStatus.IN_PROGRESS,
      creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" as `0x${string}`,
      createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      totalYesStake: BigInt(200e18),
      totalNoStake: BigInt(150e18),
    },
  ]);

  const tokenCreator = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  const isCreator = userAddress?.toLowerCase() === tokenCreator.toLowerCase();

  const completedMilestones = milestones.filter(
    (m) => m.status === MilestoneStatus.COMPLETED
  ).length;

  const handleCreateMilestone = (data: {
    title: string;
    description: string;
    targetDate: Date;
  }) => {
    // TODO: Implement blockchain transaction
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      tokenAddress: resolvedParams.address as `0x${string}`,
      title: data.title,
      description: data.description,
      targetDate: data.targetDate.getTime(),
      status: MilestoneStatus.PENDING,
      creator: userAddress as `0x${string}`,
      createdAt: Date.now(),
      totalYesStake: BigInt(0),
      totalNoStake: BigInt(0),
    };
    setMilestones([...milestones, newMilestone]);
    setShowCreateModal(false);
  };

  const handleBet = (milestoneId: string, prediction: boolean, amount: string) => {
    // TODO: Implement blockchain transaction
    console.log("Placing bet:", { milestoneId, prediction, amount });
  };

  const handleUpdateStatus = (milestoneId: string, status: MilestoneStatus) => {
    // TODO: Implement blockchain transaction
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId
          ? { ...m, status, completedAt: Date.now() }
          : m
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Token Header */}
      <div className="mb-8 rounded-xl border border-border bg-card p-8">
        <div className="flex items-start gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary/10">
            <Rocket className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{TOKEN_CONSTANTS.name}</h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              {resolvedParams.address}
            </p>
            <p className="mt-4 text-muted-foreground">
              {TOKEN_CONSTANTS.description}
            </p>
          </div>
        </div>

        {/* Token Stats */}
        <div className="mt-8 grid gap-6 border-t border-border pt-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Total Supply</p>
            <p className="mt-1 text-2xl font-semibold">
              {Number(TOKEN_CONSTANTS.totalSupply).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Milestones</p>
            <p className="mt-1 text-2xl font-semibold">
              {completedMilestones} / {milestones.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Creator</p>
            <p className="mt-1 font-mono text-sm">
              {tokenCreator.slice(0, 6)}...{tokenCreator.slice(-4)}
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Milestones</h2>
          {isCreator && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          )}
        </div>

        {milestones.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-border py-12 text-center">
            <p className="text-muted-foreground">
              No milestones yet. {isCreator && "Create your first milestone to get started!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                isCreator={isCreator}
                onBet={handleBet}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Milestone Modal */}
      {showCreateModal && (
        <CreateMilestoneModal
          tokenAddress={resolvedParams.address}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateMilestone}
        />
      )}
    </div>
  );
}
