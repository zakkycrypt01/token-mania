"use client"

import { Pie, PieChart, Cell, Legend } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
    { category: "Presale", value: 40, fill: "hsl(var(--chart-1))" },
    { category: "Liquidity", value: 30, fill: "hsl(var(--chart-2))" },
    { category: "Team & Advisors", value: 10, fill: "hsl(var(--chart-3))" },
    { category: "Marketing", value: 7, fill: "hsl(var(--chart-4))" },
    { category: "Community Rewards", value: 10, fill: "hsl(var(--chart-5))" },
    { category: "Product Development", value: 3, fill: "hsl(var(--secondary-foreground))" },
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
  "Team & Advisors": {
    label: "Team & Advisors",
    color: "hsl(var(--chart-3))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
  "Community Rewards": {
    label: "Community Rewards",
    color: "hsl(var(--chart-5))",
  },
  "Product Development": {
    label: "Product Development",
    color: "hsl(var(--secondary-foreground))",
  },
}

export default function TokenomicsSection() {
  return (
    <section id="tokenomics" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400 mb-4">
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
            <Card className="w-full bg-background/50 border-primary/10">
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
                      innerRadius={80}
                      strokeWidth={2}
                      labelLine={false}
                    >
                      {chartData.map((entry) => (
                          <Cell key={`cell-${entry.category}`} fill={entry.fill} className="transition-opacity hover:opacity-80" />
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
