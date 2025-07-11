import { ArrowLeft, Eye, Lock, Shield, UserCheck } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
      {/* Header */}
      <Section className="pt-8 pb-4">
        <Container>
          <div className="mb-8 flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Shield className="text-primary h-8 w-8" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              We&apos;re committed to protecting your privacy and being
              transparent about how we collect, use, and share your information.
            </p>
            <Badge variant="secondary" className="px-4 py-2">
              Last updated: December 2024
            </Badge>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="pb-16">
        <Container>
          <Card className="mx-auto max-w-4xl p-8 shadow-lg">
            <div className="space-y-8">
              {/* Quick Overview */}
              <div className="bg-primary/5 border-primary/20 rounded-lg border p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Eye className="h-5 w-5" />
                  Quick Overview
                </h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    • We collect only the information necessary to provide our
                    portfolio service
                  </li>
                  <li>• We never sell your personal data to third parties</li>
                  <li>
                    • You have full control over your data and can delete your
                    account anytime
                  </li>
                  <li>
                    • We use industry-standard security measures to protect your
                    information
                  </li>
                </ul>
              </div>

              {/* Information We Collect */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">
                  1. Information We Collect
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Information You Provide
                    </h3>
                    <ul className="text-muted-foreground ml-4 space-y-1">
                      <li>• Account information (email, username, password)</li>
                      <li>
                        • Profile information (name, bio, profile picture)
                      </li>
                      <li>
                        • Portfolio content (projects, descriptions, images)
                      </li>
                      <li>• Contact information for client inquiries</li>
                      <li>
                        • Payment information (processed securely through Polar)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Automatically Collected Information
                    </h3>
                    <ul className="text-muted-foreground ml-4 space-y-1">
                      <li>
                        • Usage analytics (page views, time spent, interactions)
                      </li>
                      <li>
                        • Device information (browser type, operating system)
                      </li>
                      <li>• IP address and general location</li>
                      <li>• Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* How We Use Information */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">
                  2. How We Use Your Information
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Core Service</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Create and host your portfolio</li>
                      <li>• Provide portfolio analytics</li>
                      <li>• Process payments and subscriptions</li>
                      <li>• Customer support</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Improvements</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Analyze usage patterns</li>
                      <li>• Improve our service</li>
                      <li>• Develop new features</li>
                      <li>• Security and fraud prevention</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Information Sharing */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">
                  3. Information Sharing
                </h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
                    <h3 className="mb-2 text-lg font-medium text-green-800 dark:text-green-200">
                      What We DON&apos;T Do
                    </h3>
                    <ul className="space-y-1 text-green-700 dark:text-green-300">
                      <li>• We never sell your personal data</li>
                      <li>• We don&apos;t share data with advertisers</li>
                      <li>
                        • We don&apos;t use your content for AI training without
                        permission
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Limited Sharing
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      We only share information in these specific cases:
                    </p>
                    <ul className="text-muted-foreground ml-4 space-y-1">
                      <li>
                        • <strong>Service Providers:</strong> Trusted partners
                        who help us operate (hosting, payment processing,
                        analytics)
                      </li>
                      <li>
                        • <strong>Legal Requirements:</strong> When required by
                        law or to protect our rights
                      </li>
                      <li>
                        • <strong>Business Transfers:</strong> In case of merger
                        or acquisition (you&apos;ll be notified)
                      </li>
                      <li>
                        • <strong>Your Consent:</strong> When you explicitly
                        authorize sharing
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Data Security */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
                  <Lock className="h-6 w-6" />
                  4. Data Security
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect
                    your information:
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ul className="text-muted-foreground space-y-2">
                      <li>• SSL encryption for all data transmission</li>
                      <li>• Secure password hashing</li>
                      <li>• Regular security audits</li>
                    </ul>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Access controls and monitoring</li>
                      <li>• Secure cloud infrastructure</li>
                      <li>• Regular backups</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Your Rights */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
                  <UserCheck className="h-6 w-6" />
                  5. Your Rights
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    You have the following rights regarding your personal
                    information:
                  </p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-medium">Access & Control</h3>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• View your data</li>
                        <li>• Update your information</li>
                        <li>• Download your data</li>
                        <li>• Delete your account</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-medium">Privacy Controls</h3>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Opt out of analytics</li>
                        <li>• Control email preferences</li>
                        <li>• Manage cookie settings</li>
                        <li>• Request data deletion</li>
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Exercise Your Rights:</strong> Contact us at{" "}
                      <Link href="mailto:privacy@wrk.so" className="underline">
                        privacy@wrk.so
                      </Link>{" "}
                      to exercise any of these rights.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Cookies */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">
                  6. Cookies & Tracking
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We use cookies and similar technologies to improve your
                    experience:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">Essential Cookies</h3>
                      <p className="text-muted-foreground text-sm">
                        Required for the service to function (authentication,
                        preferences)
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Analytics Cookies</h3>
                      <p className="text-muted-foreground text-sm">
                        Help us understand how you use our service (can be
                        disabled)
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Performance Cookies</h3>
                      <p className="text-muted-foreground text-sm">
                        Improve loading times and user experience
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* International Users */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">
                  7. International Users
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Wrk.so is operated from the United States. By using our
                    service, you consent to the transfer and processing of your
                    information in the US.
                  </p>
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      <strong>EU Users:</strong> We comply with GDPR
                      requirements and provide appropriate safeguards for your
                      data.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Children's Privacy */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">
                  8. Children&apos;s Privacy
                </h2>
                <p className="text-muted-foreground">
                  Wrk.so is not intended for children under 13. We do not
                  knowingly collect personal information from children under 13.
                  If you believe we have collected such information, please
                  contact us immediately.
                </p>
              </section>

              <Separator />

              {/* Updates */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">
                  9. Policy Updates
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We may update this privacy policy from time to time.
                    We&apos;ll notify you of significant changes by:
                  </p>
                  <ul className="text-muted-foreground ml-4 space-y-1">
                    <li>• Email notification (for material changes)</li>
                    <li>• In-app notification</li>
                    <li>• Updating the &quot;Last updated&quot; date above</li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Contact */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">10. Contact Us</h2>
                <div className="bg-muted/50 rounded-lg p-6">
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this privacy policy or our
                    data practices, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong>{" "}
                      <Link
                        href="mailto:privacy@wrk.so"
                        className="text-primary hover:underline"
                      >
                        privacy@wrk.so
                      </Link>
                    </p>
                    <p>
                      <strong>Support:</strong>{" "}
                      <Link
                        href="mailto:support@wrk.so"
                        className="text-primary hover:underline"
                      >
                        support@wrk.so
                      </Link>
                    </p>
                    <p>
                      <strong>Address:</strong> [Your Business Address]
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
