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
    onBet?.(milestone.id, prediction, betAmount);
    setBetAmount("");
    setSelectedSide(null);
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

          {/* Market Overview */}
          <div className="grid grid-cols-2 gap-3">
            {/* YES Side */}
            <div
              className={`rounded-lg border-2 p-4 transition-all ${
                selectedSide === true
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-semibold">YES</span>
                </div>
                <span className="text-sm font-mono">{yesOdds}x</span>
              </div>
              <div className="mb-2 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${yesPercentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {yesPercentage.toFixed(0)}% - {totalYes.toFixed(2)} CELO
              </div>
            </div>

            {/* NO Side */}
            <div
              className={`rounded-lg border-2 p-4 transition-all ${
                selectedSide === false
                  ? "border-destructive bg-destructive/5"
                  : "border-border hover:border-destructive/50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="font-semibold">NO</span>
                </div>
                <span className="text-sm font-mono">{noOdds}x</span>
              </div>
              <div className="mb-2 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-destructive transition-all"
                  style={{ width: `${noPercentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {noPercentage.toFixed(0)}% - {totalNo.toFixed(2)} CELO
              </div>
            </div>
          </div>

          {/* Bet Placement */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Bet amount (CELO)"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleBet(true)}
                disabled={!betAmount || Number(betAmount) <= 0}
                className="bg-primary hover:bg-primary/90"
              >
                Bet YES
              </Button>
              <Button
                onClick={() => handleBet(false)}
                disabled={!betAmount || Number(betAmount) <= 0}
                variant="destructive"
              >
                Bet NO
              </Button>
            </div>
            {betAmount && Number(betAmount) > 0 && (
              <p className="text-xs text-muted-foreground text-center">
                Potential return:{" "}
                {selectedSide === true
                  ? (Number(betAmount) * Number(yesOdds)).toFixed(2)
                  : (Number(betAmount) * Number(noOdds)).toFixed(2)}{" "}
                CELO
              </p>
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
