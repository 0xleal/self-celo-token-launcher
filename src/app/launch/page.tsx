"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Ticket,
} from "lucide-react";
import { useAccount } from "wagmi";
import { TokenLaunchForm, TOKEN_CONSTANTS } from "@/types";

// Import verification step component
import { VerificationStep } from "@/components/launch/verification-step";

type LaunchStep = "details" | "verify" | "review";

export default function LaunchPage() {
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState<LaunchStep>("details");
  const [formData, setFormData] = useState<TokenLaunchForm>({
    ticket: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TokenLaunchForm, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TokenLaunchForm, string>> = {};

    if (!formData.ticket.trim()) {
      newErrors.ticket = "Ticket is required";
    } else if (formData.ticket.length < 2 || formData.ticket.length > 10) {
      newErrors.ticket = "Ticket must be between 2 and 10 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.ticket)) {
      newErrors.ticket = "Ticket must contain only letters and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === "details") {
      if (validateForm()) {
        setCurrentStep("verify");
      }
    } else if (currentStep === "verify") {
      setCurrentStep("review");
    }
  };

  const handleBack = () => {
    if (currentStep === "review") {
      setCurrentStep("verify");
    } else if (currentStep === "verify") {
      setCurrentStep("details");
    }
  };

  const handleLaunch = async () => {
    // TODO: Implement token launch logic
    console.log("Launching token with data:", {
      ticket: formData.ticket,
      ...TOKEN_CONSTANTS,
    });
  };

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Connect Your Wallet</h2>
          <p className="mt-2 text-muted-foreground">
            Please connect your wallet to launch a token
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Launch Your Token</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Create a builder token with human verification
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === "details"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium">Details</span>
        </div>
        <div className="h-px w-12 bg-border" />
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === "verify"
                ? "bg-primary text-primary-foreground"
                : currentStep === "review"
                ? "bg-primary/50 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium">Verify</span>
        </div>
        <div className="h-px w-12 bg-border" />
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === "review"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            3
          </div>
          <span className="text-sm font-medium">Review</span>
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Token Details</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Provide information about your token
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ticket" className="text-lg">
                    Token Ticket <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Choose a unique identifier for your builder token (2-10 alphanumeric characters)
                  </p>
                  <div className="flex items-center gap-3">
                    <Ticket className="h-5 w-5 text-primary" />
                    <Input
                      id="ticket"
                      placeholder="e.g., ALICE, BOB123, DEV"
                      value={formData.ticket}
                      onChange={(e) =>
                        setFormData({ ticket: e.target.value.toUpperCase() })
                      }
                      maxLength={10}
                      className={`text-lg font-mono ${errors.ticket ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.ticket && (
                    <p className="text-sm text-destructive">{errors.ticket}</p>
                  )}
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-6">
                  <h4 className="mb-3 text-sm font-semibold">Standard Token Settings</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium text-foreground">{TOKEN_CONSTANTS.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Supply:</span>
                      <span className="font-medium text-foreground">
                        {Number(TOKEN_CONSTANTS.totalSupply).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Decimals:</span>
                      <span className="font-medium text-foreground">{TOKEN_CONSTANTS.decimals}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    These settings are the same for all builder tokens
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    After creating your token, you'll be able to set milestones and
                    engage with the community through prediction markets.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="mt-8 flex justify-end">
                <Button size="lg" onClick={handleNext}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {currentStep === "verify" && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VerificationStep onNext={handleNext} onBack={handleBack} />
          </motion.div>
        )}

        {currentStep === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Review & Launch</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Review your token details before launching
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-muted/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Token Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket</p>
                      <p className="font-mono text-xl font-bold text-primary">
                        {formData.ticket}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Creator</p>
                      <p className="truncate font-mono text-sm">{address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{TOKEN_CONSTANTS.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Supply</p>
                      <p className="font-medium">
                        {Number(TOKEN_CONSTANTS.totalSupply).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Decimals</p>
                      <p className="font-medium">{TOKEN_CONSTANTS.decimals}</p>
                    </div>
                  </div>
                  {TOKEN_CONSTANTS.description && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="mt-1 text-sm">{TOKEN_CONSTANTS.description}</p>
                    </div>
                  )}
                </div>

                <Alert>
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    Your identity has been verified. You're ready to launch your token!
                  </AlertDescription>
                </Alert>

                <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    What happens next?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>Your token will be deployed on Celo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>You can set milestones to track your progress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>
                        Community can bet on your milestone completion through
                        prediction markets
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>Build credibility by completing milestones on time</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" size="lg" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleLaunch}
                  className="bg-gradient-to-r from-[#35D07F] to-[#46CD85]"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Launch Token
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
