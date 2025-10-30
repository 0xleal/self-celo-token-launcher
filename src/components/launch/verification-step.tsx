"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { SelfQRcodeWrapper, SelfAppBuilder } from "@selfxyz/qrcode";
import { getVerificationChainConfig } from "@/lib/chain-config";

interface VerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function VerificationStep({ onNext, onBack }: VerificationStepProps) {
  const { address } = useAccount();
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [selfApp, setSelfApp] = useState<any | null>(null);

  // Get verification configuration for Celo
  const verificationConfig = getVerificationChainConfig();
  const contractAddress = verificationConfig.verificationRegistryAddress;
  const chainId = verificationConfig.chain.id;
  const scopeSeed = verificationConfig.scopeSeed;

  const {
    data: isVerified,
    refetch: refetchVerification,
    status: verificationStatus,
  } = useReadContract({
    address: contractAddress,
    abi: verificationConfig.verificationRegistryAbi,
    functionName: "isVerified",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    chainId,
    query: { enabled: !!contractAddress && !!address },
  } as any);

  // Build Self app config
  useEffect(() => {
    if (!scopeSeed || !contractAddress) return;
    const userId =
      (address as string) || "0x0000000000000000000000000000000000000000";
    try {
      const app = new SelfAppBuilder({
        version: 2,
        appName: "Celo Token Launcher",
        scope: scopeSeed,
        endpoint: contractAddress,
        userId,
        endpointType: "evm" as any,
        userIdType: "hex",
        userDefinedData: "Creator verification for Celo Token Launcher",
        disclosures: {
          minimumAge: 18,
          ofac: true,
        },
      }).build();
      setSelfApp(app);
    } catch (e) {
      console.error("Failed to init Self app", e);
      setVerificationError("Failed to initialize verification");
    }
  }, [
    scopeSeed,
    address,
    contractAddress,
    verificationConfig.selfEndpointType,
  ]);

  const handleNext = () => {
    if (isVerified) {
      onNext();
    }
  };

  // Auto-advance after successful verification
  useEffect(() => {
    if (verificationSuccess) {
      refetchVerification?.();
      // Give user a moment to see the success message, then refetch and advance
      const timer = setTimeout(async () => {
        onNext();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [verificationSuccess, onNext, refetchVerification]);

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Verify Your Identity</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Prove you're human to ensure secure and compliant token launches
        </p>
      </div>

      <div className="space-y-6">
        {isVerified ? (
          /* Already Verified */
          <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Already Verified!</h3>
            <p className="text-muted-foreground max-w-md">
              Your identity has been verified. You can proceed with the token
              launch.
            </p>
          </div>
        ) : verificationSuccess ? (
          /* Just Verified */
          <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Verification Successful!
            </h3>
            <p className="text-muted-foreground max-w-md">
              Your identity has been verified on-chain. You can now proceed with
              the token launch.
            </p>
          </div>
        ) : (
          /* Need to Verify */
          <div className="space-y-6">
            <div className="rounded-lg bg-muted/50 p-6 space-y-3">
              <h4 className="font-semibold">Why verification?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Prevents bot and sybil attacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ensures compliance with regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Protects token creators and investors</span>
                </li>
              </ul>
            </div>

            {selfApp ? (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Scan this QR code with your <strong>Self app</strong> to
                    complete verification. This is required once every 30 days.
                  </p>
                  <p>
                    Don't have the app?{" "}
                    <a
                      href="https://self.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Download here
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>

                <div className="flex justify-center p-8 bg-white dark:bg-muted rounded-lg">
                  <SelfQRcodeWrapper
                    selfApp={selfApp}
                    onSuccess={() => {
                      setVerificationSuccess(true);
                    }}
                    onError={(error) => {
                      console.error("Verification error:", error);
                      setVerificationError(
                        "Verification failed. Please try again."
                      );
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Loading verification QR code...
              </div>
            )}

            {verificationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{verificationError}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isVerified && !verificationSuccess}
          size="lg"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}
