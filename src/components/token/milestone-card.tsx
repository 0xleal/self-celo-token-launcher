"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Milestone, MilestoneStatus } from "@/types";
import { formatDistance } from "date-fns";

interface MilestoneCardProps {
  milestone: Milestone;
  isCreator: boolean;
  onBet?: (milestoneId: string, prediction: boolean, amount: string) => void;
  onUpdateStatus?: (milestoneId: string, status: MilestoneStatus) => void;
}

export function MilestoneCard({ milestone, isCreator, onBet, onUpdateStatus }: MilestoneCardProps) {
  const [betAmount, setBetAmount] = useState("");
  const [selectedSide, setSelectedSide] = useState<boolean | null>(null);

  // Calculate odds
  const totalYes = Number(milestone.totalYesStake || 0);
  const totalNo = Number(milestone.totalNoStake || 0);
  const totalPool = totalYes + totalNo;

  const yesOdds = totalPool > 0 ? (totalPool / (totalYes || 1)).toFixed(2) : "2.00";
  const noOdds = totalPool > 0 ? (totalPool / (totalNo || 1)).toFixed(2) : "2.00";

  const yesPercentage = totalPool > 0 ? (totalYes / totalPool) * 100 : 50;
  const noPercentage = totalPool > 0 ? (totalNo / totalPool) * 100 : 50;

  const handleBet = (prediction: boolean) => {
    if (!betAmount || Number(betAmount) <= 0) return;
    setSelectedSide(prediction);
    onBet?.(milestone.id, prediction, betAmount);
    setBetAmount("");
    setTimeout(() => setSelectedSide(null), 2000); // Clear selection after 2s
  };

  const getStatusIcon = () => {
    switch (milestone.status) {
      case MilestoneStatus.COMPLETED:
        return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case MilestoneStatus.FAILED:
        return <XCircle className="h-5 w-5 text-destructive" />;
      case MilestoneStatus.IN_PROGRESS:
        return <Clock className="h-5 w-5 text-secondary" />;
      default:
        return <Target className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (milestone.status) {
      case MilestoneStatus.COMPLETED:
        return <Badge className="bg-primary">Completed</Badge>;
      case MilestoneStatus.FAILED:
        return <Badge variant="destructive">Failed</Badge>;
      case MilestoneStatus.IN_PROGRESS:
        return <Badge className="bg-secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const isExpired = milestone.targetDate < Date.now();
  const canBet = milestone.status === MilestoneStatus.PENDING && !isExpired;

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1">{getStatusIcon()}</div>
          <div>
            <h3 className="text-lg font-semibold">{milestone.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {milestone.description}
            </p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Target Date */}
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>
          Target: {new Date(milestone.targetDate).toLocaleDateString()}
          {!isExpired && (
            <span className="ml-2">
              ({formatDistance(new Date(milestone.targetDate), new Date(), { addSuffix: true })})
            </span>
          )}
        </span>
      </div>

      {/* Betting Interface */}
      {canBet && (
        <div className="space-y-4 border-t border-border pt-4">
          <div className="text-sm font-medium">Prediction Market</div>

          {/* Tug-of-War Chart */}
          <div className="rounded-lg border border-border bg-muted/30 p-6">
            {/* Top Labels: Percentages and Odds */}
            <div className="mb-3 flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="font-semibold text-destructive">NO</span>
                </div>
                <div className="mt-1 font-mono text-lg font-bold">
                  {noPercentage.toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">{noOdds}x odds</div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-semibold text-primary">YES</span>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-1 font-mono text-lg font-bold">
                  {yesPercentage.toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">{yesOdds}x odds</div>
              </div>
            </div>

            {/* Horizontal Bar with Marker */}
            <div className="relative mb-3">
              {/* Background gradient bar */}
              <div className="h-8 rounded-full bg-gradient-to-r from-destructive/20 via-muted to-primary/20">
                {/* Marker indicating current position */}
                <div
                  className="absolute top-0 flex h-8 items-center transition-all duration-300"
                  style={{ left: `${yesPercentage}%` }}
                >
                  <div className="relative -ml-4 flex h-10 w-10 items-center justify-center">
                    <div className="absolute h-10 w-10 animate-ping rounded-full bg-primary/30 opacity-75"></div>
                    <div className="relative h-8 w-8 rounded-full border-4 border-background bg-primary shadow-lg"></div>
                  </div>
                </div>
              </div>

              {/* Center line (50/50) */}
              <div className="absolute left-1/2 top-0 h-8 w-0.5 -translate-x-1/2 bg-border opacity-50"></div>
            </div>

            {/* Bottom Labels: Stake Amounts */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div>{totalNo.toFixed(1)} CELO staked</div>
              <div>{totalYes.toFixed(1)} CELO staked</div>
            </div>
          </div>

          {/* Bet Placement */}
          <div className="space-y-3">
            <Input
              type="number"
              placeholder="Bet amount (CELO)"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              min="0"
              step="0.1"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleBet(false)}
                disabled={!betAmount || Number(betAmount) <= 0}
                variant="destructive"
                size="lg"
              >
                <TrendingDown className="mr-2 h-4 w-4" />
                Bet NO
              </Button>
              <Button
                onClick={() => handleBet(true)}
                disabled={!betAmount || Number(betAmount) <= 0}
                className="bg-primary hover:bg-primary/90"
                size="lg"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Bet YES
              </Button>
            </div>
            {betAmount && Number(betAmount) > 0 && (
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-sm font-medium">
                  Potential return:{" "}
                  <span className="font-mono text-base font-bold text-primary">
                    {selectedSide === true
                      ? (Number(betAmount) * Number(yesOdds)).toFixed(2)
                      : selectedSide === false
                      ? (Number(betAmount) * Number(noOdds)).toFixed(2)
                      : "Select YES or NO"}
                  </span>{" "}
                  CELO
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resolved Market */}
      {(milestone.status === MilestoneStatus.COMPLETED ||
        milestone.status === MilestoneStatus.FAILED) && (
        <div className="border-t border-border pt-4">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="text-sm font-medium">
              {milestone.status === MilestoneStatus.COMPLETED
                ? "✓ Milestone completed - YES bets won"
                : "✗ Milestone failed - NO bets won"}
            </p>
            {totalPool > 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                Total pool: {totalPool.toFixed(2)} CELO
              </p>
            )}
          </div>
        </div>
      )}

      {/* Expired or Creator Actions */}
      {isExpired && milestone.status === MilestoneStatus.PENDING && (
        <div className="border-t border-border pt-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="mb-3 text-center text-sm font-medium">
              Deadline passed - Awaiting resolution
            </p>
            {isCreator && onUpdateStatus && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onUpdateStatus(milestone.id, MilestoneStatus.COMPLETED)}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark Completed
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => onUpdateStatus(milestone.id, MilestoneStatus.FAILED)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Mark Failed
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Creator can start milestone */}
      {isCreator && milestone.status === MilestoneStatus.PENDING && !isExpired && onUpdateStatus && (
        <div className="border-t border-border pt-4">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => onUpdateStatus(milestone.id, MilestoneStatus.IN_PROGRESS)}
          >
            <Clock className="mr-2 h-4 w-4" />
            Start Working on This
          </Button>
        </div>
      )}
    </Card>
  );
}
