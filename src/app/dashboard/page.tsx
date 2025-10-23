"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Layout from "@/layout/layout"

export default function DashboardPage() {
    const stats = [
        {
            label: "Total Users",
            value: "12,543",
            change: "+12.5%",
            isPositive: true,
            icon: Users,
        },
        {
            label: "Revenue",
            value: "$45,231",
            change: "+8.2%",
            isPositive: true,
            icon: TrendingUp,
        },
        {
            label: "Active Sessions",
            value: "2,847",
            change: "-3.1%",
            isPositive: false,
            icon: Activity,
        },
        {
            label: "Conversion Rate",
            value: "3.24%",
            change: "+2.4%",
            isPositive: true,
            icon: BarChart3,
        },
    ]

    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Welcome back! Here's your performance overview.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.label} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                                    </div>
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-4">
                                    {stat.isPositive ? (
                                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                                    )}
                                    <span className={`text-sm font-medium ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-sm text-muted-foreground">vs last month</span>
                                </div>
                            </Card>
                        )
                    })}
                </div>

                {/* Content sections */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Activity */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 pb-4 border-b border-border last:border-0">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">Activity item {i}</p>
                                        <p className="text-xs text-muted-foreground">{i * 2} hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                Create New Report
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                Export Data
                            </Button>
                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                View Analytics
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}
