"use client"

import { Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { category: "Presale", value: 40, fill: "hsl(var(--primary))" },
  { category: "Liquidity", value: 30, fill: "hsl(var(--accent))" },
  { category: "Team & Advisors", value: 10, fill: "hsl(var(--secondary-foreground))" },
  { category: "Marketing", value: 10, fill: "hsl(var(--muted-foreground))" },
  { category: "Community Rewards", value: 10, fill: "hsl(var(--foreground))" },
]

const chartConfig = {
  value: {
    label: "Percentage",
  },
  presale: {
    label: "Presale",
    color: "hsl(var(--chart-1))",
  },
  liquidity: {
    label: "Liquidity",
    color: "hsl(var(--chart-2))",
  },
  team: {
    label: "Team & Advisors",
    color: "hsl(var(--chart-3))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
  rewards: {
    label: "Community Rewards",
    color: "hsl(var(--chart-5))",
  },
}

export default function TokenomicsSection() {
  return (
    <section id="tokenomics" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-tighter mb-4">
              Tokenomics
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A balanced and sustainable token distribution designed for long-term growth and community rewards. Total Supply: 1,000,000,000 Tokens.
            </p>
            <div className="space-y-4">
              {chartData.map((item) => (
                 <div key={item.category} className="flex items-center">
                   <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.fill }} />
                   <span className="font-medium">{item.category}:</span>
                   <span className="ml-auto text-muted-foreground">{item.value}%</span>
                 </div>
              ))}
            </div>
          </div>
          <div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="font-headline">Token Distribution</CardTitle>
                <CardDescription>Visual breakdown of supply allocation.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square h-[300px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="category"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      {chartData.map((entry) => (
                          <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
