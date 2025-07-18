"use client";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  Globe,
  RefreshCw,
  Settings,
  Shield,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePostHogEvents } from "@/components/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DomainStatus {
  domain: string | null;
  status: string | null;
  verifiedAt: string | null;
  hasActivePro: boolean;
  errorMessage?: string | null;
}

export function DomainManagement() {
  const [domainStatus, setDomainStatus] = useState<DomainStatus | null>(null);
  const [newDomain, setNewDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const {
    trackCustomDomainAdded,
    trackCustomDomainVerified,
    trackCustomDomainRemoved,
  } = usePostHogEvents();

  const fetchDomainStatus = useCallback(async () => {
    try {
      setIsLoadingStatus(true);
      const response = await fetch("/api/pro/domain");
      const data = await response.json();

      if (response.ok) {
        setDomainStatus(data);
      } else {
        console.error("Failed to fetch domain status:", data.error);
        toast.error(data.error || "Failed to load domain status");
      }
    } catch (error) {
      console.error("Error fetching domain status:", error);
      toast.error("Failed to load domain status");
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  // Load current domain status
  useEffect(() => {
    fetchDomainStatus();
  }, [fetchDomainStatus]);

  const addDomain = async () => {
    if (!newDomain.trim()) {
      toast.error("Please enter a domain");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/pro/domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: newDomain.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        trackCustomDomainAdded(newDomain.trim());
        setNewDomain("");
        setRetryCount(0); // Reset retry count on success
        await fetchDomainStatus();
      } else {
        toast.error(data.error);

        // Show additional help for configuration errors
        if (data.error?.includes("Vercel API configuration")) {
          toast.error("Configuration issue detected. Please contact support.", {
            description:
              "The domain management system requires additional setup.",
          });
        }
      }
    } catch (error) {
      console.error("Error adding domain:", error);
      toast.error("Failed to add domain");
    } finally {
      setIsLoading(false);
    }
  };

  const removeDomain = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/pro/domain", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        if (domainStatus?.domain) {
          trackCustomDomainRemoved(domainStatus.domain);
        }
        setRetryCount(0); // Reset retry count
        await fetchDomainStatus();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error removing domain:", error);
      toast.error("Failed to remove domain");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyDomain = async () => {
    if (!domainStatus?.domain) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/pro/domain/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: domainStatus.domain }),
      });

      const data = await response.json();

      if (data.verified) {
        toast.success(data.message);
        if (domainStatus?.domain) {
          trackCustomDomainVerified(domainStatus.domain);
        }
        setRetryCount(0); // Reset retry count on success
        await fetchDomainStatus();
      } else {
        toast.error(data.message);

        // Increment retry count and show different messages
        setRetryCount((prev: number) => prev + 1);

        // Show additional guidance based on error type
        if (data.error?.includes("Vercel API configuration")) {
          toast.error(
            "System configuration issue detected. Please contact support.",
            {
              description:
                "This appears to be a system-level configuration problem.",
            }
          );
        } else if (data.error?.includes("DNS")) {
          toast.info("DNS propagation can take time", {
            description:
              "DNS changes may take up to 48 hours to propagate worldwide. You can retry verification periodically.",
          });
        }
      }
    } catch (error) {
      console.error("Error verifying domain:", error);
      toast.error("Failed to verify domain");
      setRetryCount((prev: number) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const runDiagnostics = async () => {
    if (!domainStatus?.domain) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/pro/domain/diagnostics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: domainStatus.domain }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show diagnostic results in a toast
        const { summary } = data;
        if (summary.errors > 0) {
          toast.error(
            `Diagnostics found ${summary.errors} error(s) and ${summary.warnings} warning(s)`,
            {
              description:
                "Check the console for detailed diagnostic information.",
            }
          );
        } else if (summary.warnings > 0) {
          toast.warning(`Diagnostics found ${summary.warnings} warning(s)`, {
            description:
              "Domain should work but there may be optimization opportunities.",
          });
        } else {
          toast.success("All diagnostics passed!", {
            description: "Your domain configuration looks good.",
          });
        }

        // Log detailed results to console for debugging
        console.log("Domain diagnostics:", data);
      } else {
        toast.error("Failed to run diagnostics");
      }
    } catch (error) {
      console.error("Error running diagnostics:", error);
      toast.error("Failed to run diagnostics");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending DNS Setup
          </Badge>
        );
      case "dns_configured":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Settings className="mr-1 h-3 w-3" />
            DNS Configured
          </Badge>
        );
      case "vercel_pending":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Settings className="mr-1 h-3 w-3" />
            Setting up Vercel
          </Badge>
        );
      case "ssl_pending":
        return (
          <Badge className="bg-orange-100 text-orange-800">
            <Shield className="mr-1 h-3 w-3" />
            SSL Pending
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRetryMessage = () => {
    if (retryCount === 0) return null;

    if (retryCount < 3) {
      return (
        <Alert className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Verification attempt {retryCount}/3. DNS changes can take time to
            propagate. You can retry now or wait a few minutes.
          </AlertDescription>
        </Alert>
      );
    } else {
      return (
        <Alert className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Multiple verification attempts failed. This usually indicates a DNS
            configuration issue. Please double-check your DNS settings or
            contact support if you need assistance.
          </AlertDescription>
        </Alert>
      );
    }
  };

  if (isLoadingStatus) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Globe className="h-5 w-5" />
            Custom Domain
          </h2>
          <p className="text-muted-foreground text-sm">
            Use your own domain for your portfolio
          </p>
        </div>
        <div className="space-y-4">
          {/* Loading skeleton to prevent layout shift */}
          <div className="bg-muted/30 animate-pulse rounded border p-4">
            <div className="bg-muted h-4 w-48 rounded"></div>
            <div className="bg-muted mt-2 h-3 w-32 rounded"></div>
          </div>
          <div className="bg-muted/30 animate-pulse rounded border p-4">
            <div className="bg-muted h-4 w-64 rounded"></div>
            <div className="bg-muted mt-2 h-3 w-80 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!domainStatus?.hasActivePro) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Globe className="h-5 w-5" />
            Custom Domain
          </h2>
          <p className="text-muted-foreground text-sm">
            Use your own domain for your portfolio
          </p>
        </div>
        <div>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Custom domains are a Pro feature. Upgrade to Pro to use your own
              domain.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Globe className="h-5 w-5" />
          Custom Domain
        </h2>
        <p className="text-muted-foreground text-sm">
          Use your own domain for your portfolio
        </p>
      </div>
      <div className="space-y-6">
        {domainStatus.domain ? (
          <div className="space-y-4">
            {/* Current Domain Display */}
            <div className="bg-muted/30 flex items-center justify-between rounded border p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{domainStatus.domain}</span>
                  {getStatusBadge(domainStatus.status)}
                </div>
                {domainStatus.verifiedAt && (
                  <p className="text-muted-foreground text-sm">
                    Verified on{" "}
                    {new Date(domainStatus.verifiedAt).toLocaleDateString()}
                  </p>
                )}
                {domainStatus.errorMessage && (
                  <p className="text-sm text-red-600">
                    {domainStatus.errorMessage}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {domainStatus.status === "active" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(`https://${domainStatus.domain}`, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={runDiagnostics}
                  disabled={isLoading}
                  title="Run diagnostics to check domain configuration"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeDomain}
                  disabled={isLoading}
                >
                  Remove
                </Button>
              </div>
            </div>

            {/* Status-specific Instructions */}
            {domainStatus.status !== "active" && (
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {domainStatus.status === "pending" &&
                      "To activate your custom domain, please configure your DNS settings:"}
                    {domainStatus.status === "dns_configured" &&
                      "DNS is configured! Setting up your domain with Vercel..."}
                    {domainStatus.status === "vercel_pending" &&
                      "Domain added to Vercel. Configuring SSL certificate..."}
                    {domainStatus.status === "ssl_pending" &&
                      "SSL certificate is being provisioned. This may take a few minutes."}
                    {domainStatus.status === "error" &&
                      "There was an error configuring your domain. Please check the error message above and try again."}
                  </AlertDescription>
                </Alert>

                {(domainStatus.status === "pending" ||
                  domainStatus.status === "error") && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">
                        CNAME Record (Recommended)
                      </Label>
                      <div className="mt-1 flex items-center gap-2">
                        <code className="bg-muted flex-1 rounded p-2 text-sm">
                          {domainStatus.domain} → cname.vercel-dns.com
                        </code>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `${domainStatus.domain} CNAME cname.vercel-dns.com`
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        A Record (Alternative)
                      </Label>
                      <div className="mt-1 flex items-center gap-2">
                        <code className="bg-muted flex-1 rounded p-2 text-sm">
                          {domainStatus.domain} → 76.76.19.61
                        </code>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `${domainStatus.domain} A 76.76.19.61`
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={verifyDomain}
                    disabled={
                      isLoading ||
                      (domainStatus.status !== "pending" &&
                        domainStatus.status !== "error" &&
                        domainStatus.status !== "ssl_pending")
                    }
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : domainStatus.status === "ssl_pending" ? (
                      "Check SSL Status"
                    ) : domainStatus.status === "dns_configured" ? (
                      "Configuring..."
                    ) : domainStatus.status === "vercel_pending" ? (
                      "Setting up..."
                    ) : (
                      "Verify Domain"
                    )}
                  </Button>

                  {retryCount > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={runDiagnostics}
                      disabled={isLoading}
                      title="Run detailed diagnostics"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Retry feedback */}
                {getRetryMessage()}
              </div>
            )}
          </div>
        ) : (
          /* Add New Domain Form */
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <div className="flex gap-2">
                <Input
                  id="domain"
                  type="text"
                  placeholder="yourdomain.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addDomain();
                    }
                  }}
                />
                <Button type="button" onClick={addDomain} disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Domain"}
                </Button>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Make sure you own this domain and have access to its DNS
                settings. DNS changes typically take 5-10 minutes to propagate,
                but can take up to 48 hours.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
