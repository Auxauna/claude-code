"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">K</span>
            </div>
            <span className="font-semibold text-lg">Keystone Intel</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-accent/50 text-accent">
            AI-Powered Intelligence for Real Estate
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            We Do the Research.
            <br />
            <span className="gradient-text">You Close the Deals.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium AI infrastructure for elite brokers. Get market-ready CMAs,
            due diligence reports, and property intelligence delivered to your inbox—not
            another dashboard to learn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline">
              View Sample Reports
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Trusted by top-producing brokers across the U.S.
          </p>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                You didn&apos;t become a top producer to spend hours on research
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pulling comps. Digging through property history. Writing listing descriptions.
                  Creating CMAs. These tasks eat up 15+ hours a week that should be spent
                  with clients.
                </p>
                <p>
                  Most &quot;solutions&quot; are just more software to learn. More dashboards.
                  More logins. More friction.
                </p>
                <p className="text-foreground font-medium">
                  We take a different approach: done-for-you intelligence, delivered
                  when you need it.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-destructive/10 border-destructive/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Before</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>4+ hours per CMA</p>
                  <p>Manual comp research</p>
                  <p>Miss buried property issues</p>
                  <p>Generic listing copy</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">After</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>CMA in 4 hours, in your inbox</p>
                  <p>AI-powered comp analysis</p>
                  <p>Red flags surfaced for you</p>
                  <p>Property-specific narratives</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Services</Badge>
            <h2 className="text-4xl font-bold mb-4">Intelligence, Delivered</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not another platform to manage. Professional deliverables that land in your inbox,
              ready to use with clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CompIQ */}
            <Card className="group hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle>CompIQ Reports</CardTitle>
                <CardDescription>
                  Comprehensive Market Analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    AI-curated comparable properties
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Market trend narrative
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Pricing strategy recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Client-ready PDF in 4 hours
                  </li>
                </ul>
                <Link href="/demo/compiq" className="text-accent text-sm font-medium hover:underline">
                  View Sample Report →
                </Link>
              </CardContent>
            </Card>

            {/* DealScan */}
            <Card className="group hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <CardTitle>DealScan Due Diligence</CardTitle>
                <CardDescription>
                  Property Risk Analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Ownership chain verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Lien & encumbrance alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Permit & violation history
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Red flag summary report
                  </li>
                </ul>
                <Link href="/demo/dealscan" className="text-accent text-sm font-medium hover:underline">
                  View Sample Report →
                </Link>
              </CardContent>
            </Card>

            {/* MarketPulse */}
            <Card className="group hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <CardTitle>MarketPulse Alerts</CardTitle>
                <CardDescription>
                  Real-Time Market Intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    New listing notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Price change tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Sold comp alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Weekly market digest
                  </li>
                </ul>
                <Link href="/demo/marketpulse" className="text-accent text-sm font-medium hover:underline">
                  View Sample Alert →
                </Link>
              </CardContent>
            </Card>

            {/* ListingForge */}
            <Card className="group hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <CardTitle>ListingForge</CardTitle>
                <CardDescription>
                  Marketing Content Creation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Property-specific descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Social media content pack
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Feature highlight copy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Multiple tone variations
                  </li>
                </ul>
                <Link href="/demo/listingforge" className="text-accent text-sm font-medium hover:underline">
                  View Sample Copy →
                </Link>
              </CardContent>
            </Card>

            {/* InvestorBrief */}
            <Card className="group hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle>InvestorBrief</CardTitle>
                <CardDescription>
                  Investment Property Analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Cash flow projections
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    ROI scenario modeling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Rent comp analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Cap rate benchmarking
                  </li>
                </ul>
                <Link href="/demo/investorbrief" className="text-accent text-sm font-medium hover:underline">
                  View Sample Brief →
                </Link>
              </CardContent>
            </Card>

            {/* Custom Intel */}
            <Card className="group hover:border-accent/50 transition-colors bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle>Custom Intelligence</CardTitle>
                <CardDescription>
                  Your Workflow, Automated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Tailored to your process
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Your branding & templates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Market-specific insights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Dedicated analyst support
                  </li>
                </ul>
                <Link href="#contact" className="text-accent text-sm font-medium hover:underline">
                  Let&apos;s Talk →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Process</Badge>
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and built around how you already work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Your Request</h3>
              <p className="text-muted-foreground">
                Send us the property address, MLS number, or deal details via email,
                text, or our portal. Takes 30 seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI + Human Analysis</h3>
              <p className="text-muted-foreground">
                Our AI processes market data, public records, and analytics.
                A human analyst verifies and refines the output.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Deliverable in Inbox</h3>
              <p className="text-muted-foreground">
                A polished, client-ready report lands in your inbox.
                No login required. Share directly with clients.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block bg-accent/5 border-accent/20">
              <CardContent className="py-6 px-8">
                <p className="text-lg font-medium mb-2">Average turnaround: <span className="text-accent">4 hours</span></p>
                <p className="text-sm text-muted-foreground">Same-day delivery for priority requests</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Sample Deliverables</Badge>
            <h2 className="text-4xl font-bold mb-4">See What You Get</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real examples of what lands in your inbox.
            </p>
          </div>

          <Tabs defaultValue="compiq" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="compiq">CompIQ</TabsTrigger>
              <TabsTrigger value="dealscan">DealScan</TabsTrigger>
              <TabsTrigger value="listingforge">ListingForge</TabsTrigger>
            </TabsList>

            <TabsContent value="compiq">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">CompIQ Report</p>
                      <h3 className="text-2xl font-bold">47 Lakewood Drive</h3>
                      <p className="text-sm opacity-80">The Woodlands, TX 77380</p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">Sample</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Suggested List Price</p>
                      <p className="text-3xl font-bold text-accent">$1,285,000</p>
                      <p className="text-xs text-muted-foreground">Range: $1.25M - $1.32M</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Days on Market (Avg)</p>
                      <p className="text-3xl font-bold">34</p>
                      <p className="text-xs text-muted-foreground">vs. 42 area average</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Comparable Sales</p>
                      <p className="text-3xl font-bold">8</p>
                      <p className="text-xs text-muted-foreground">Last 90 days</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Market Narrative</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The Lakewood Estates subdivision continues to demonstrate strong demand
                      for updated homes in the 4,000+ sqft category. Recent sales indicate
                      buyers are paying a premium for properties with renovated kitchens and
                      pool features—both present in this property. The subject&apos;s lot size
                      (0.42 acres) exceeds the subdivision average of 0.31 acres, supporting
                      positioning at the higher end of the suggested range...
                    </p>
                    <Button variant="outline" className="mt-4">
                      Download Full Sample PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dealscan">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">DealScan Report</p>
                      <h3 className="text-2xl font-bold">2847 Commerce Street</h3>
                      <p className="text-sm opacity-80">Houston, TX 77002</p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">Sample</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Card className="bg-green-500/10 border-green-500/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                          Clear Items
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-1">
                        <p>✓ Title chain verified (1987-present)</p>
                        <p>✓ No active liens</p>
                        <p>✓ Property taxes current</p>
                        <p>✓ No pending litigation</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-500/10 border-yellow-500/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                          Items for Review
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-1">
                        <p>⚠ Expired permit: HVAC (2019)</p>
                        <p>⚠ Easement on east boundary</p>
                        <p>⚠ Prior flood claim (2017)</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Analyst Summary</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The 2019 HVAC permit shows as &quot;expired&quot; in city records, likely due to
                      final inspection not being called. Recommend requesting documentation from
                      seller or scheduling inspection. The utility easement is standard for this
                      block and does not impact buildable area. The 2017 flood claim was resolved
                      with full remediation—documentation attached...
                    </p>
                    <Button variant="outline" className="mt-4">
                      Download Full Sample PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listingforge">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">ListingForge Content</p>
                      <h3 className="text-2xl font-bold">892 Magnolia Lane</h3>
                      <p className="text-sm opacity-80">Spring, TX 77373</p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">Sample</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Badge variant="outline">MLS Description</Badge>
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed bg-muted p-4 rounded-lg">
                        Stunning single-story estate on a private half-acre lot in the heart of
                        Spring&apos;s most coveted enclave. This meticulously maintained 4-bedroom
                        residence showcases a recent chef&apos;s kitchen renovation featuring quartzite
                        countertops, Wolf appliances, and custom cabinetry. The primary suite
                        offers a spa-like retreat with heated floors and frameless glass shower.
                        Entertain effortlessly in the resort-style backyard complete with heated
                        pool, outdoor kitchen, and mature landscaping ensuring complete privacy...
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Badge variant="outline">Social Media</Badge>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Instagram</p>
                          <p className="text-sm">
                            Just listed in Spring 🏡 Half-acre private retreat with resort-style
                            pool + outdoor kitchen. Chef&apos;s kitchen with Wolf appliances.
                            This one won&apos;t last. DM for details.
                          </p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">LinkedIn</p>
                          <p className="text-sm">
                            New Listing: A rare opportunity in Spring&apos;s premier neighborhood.
                            4BR estate on 0.5 acres with $150K+ in recent upgrades.
                            Perfect for executives seeking privacy and luxury.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="mt-4">
                      Download Full Content Pack
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pay per deliverable or save with a monthly retainer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Per Report</CardTitle>
                <CardDescription>Pay as you go</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">CompIQ Report</span>
                    <span className="font-medium">$199</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">DealScan</span>
                    <span className="font-medium">$299</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">ListingForge</span>
                    <span className="font-medium">$149</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">InvestorBrief</span>
                    <span className="font-medium">$349</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-accent relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle>Pro Retainer</CardTitle>
                <CardDescription>For active brokers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$799</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>5 CompIQ Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>3 DealScan Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Unlimited ListingForge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>MarketPulse Alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Priority turnaround</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Pro
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For teams & brokerages</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Volume pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Team accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Dedicated analyst</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>API access</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to get your time back?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join top-producing brokers who&apos;ve automated their research
            workflow. First report is on us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Your Free Report
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">K</span>
              </div>
              <span className="font-semibold">Keystone Intel</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered intelligence for elite real estate professionals.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
