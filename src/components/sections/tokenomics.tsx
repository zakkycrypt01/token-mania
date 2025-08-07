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
    { category: "Presale", value: 17.5, fill: "hsl(var(--chart-1))" },
    { category: "Liquidity", value: 20, fill: "hsl(var(--chart-2))" },
    { category: "Marketing", value: 7.5, fill: "hsl(var(--chart-3))" },
    { category: "Team", value: 5.5, fill: "hsl(var(--chart-4))" },
    { category: "Product Development", value: 7.5, fill: "hsl(var(--chart-5))" },
    { category: "Community Program", value: 5, fill: "hsl(var(--secondary-foreground))" },
    { category: "Partnership", value: 7, fill: "hsl(var(--primary))" },
    { category: "Reserve", value: 30, fill: "hsl(var(--muted))" },
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
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-3))",
  },
  team: {
    label: "Team",
    color: "hsl(var(--chart-4))",
  },
  "Product Development": {
    label: "Product Development",
    color: "hsl(var(--chart-5))",
  },
  "Community Program": {
    label: "Community Program",
    color: "hsl(var(--secondary-foreground))",
  },
  partnership: {
    label: "Partnership",
    color: "hsl(var(--primary))",
  },
  reserve: {
    label: "Reserve",
    color: "hsl(var(--muted))",
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
