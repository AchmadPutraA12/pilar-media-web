"use client"

import { useEffect, useState, useMemo } from "react"
import Layout from "@/layout/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, EyeIcon } from "lucide-react"
import Link from "next/link"

interface JobOrder {
    id: number
    transaction_number: string
    customer_name: string
    status: { nama: string }
    driver: { name: string }
    vehicle: { nama_kendaraan: string }
    total_weight: number
    total_volume: number
}

export default function JobOrderPage() {
    const [jobOrders, setJobOrders] = useState<JobOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job-orders`, {
                    headers: { "Content-Type": "application/json" },
                })
                if (!res.ok) throw new Error("Failed to fetch")
                const data = await res.json()
                setJobOrders(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredOrders = useMemo(() => {
        return jobOrders.filter(order =>
            Object.values(order).some(val =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [jobOrders, search])

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const paginatedData = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages))
    const handlePrev = () => setCurrentPage(p => Math.max(p - 1, 1))

    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Job Orders</h1>
                    <p className="text-muted-foreground mt-2">List of current delivery orders.</p>
                </div>

                <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <CardTitle>All Job Orders</CardTitle>
                        <Input
                            placeholder="Search job orders..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="max-w-sm"
                        />
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No</TableHead>
                                            <TableHead>Transaction</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Driver</TableHead>
                                            <TableHead>Vehicle</TableHead>
                                            <TableHead>Weight (kg)</TableHead>
                                            <TableHead>Volume (m³)</TableHead>
                                            <TableHead className="text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((order, i) => (
                                                <TableRow key={order.id}>
                                                    <TableCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableCell>
                                                    <TableCell>{order.transaction_number}</TableCell>
                                                    <TableCell>{order.customer_name}</TableCell>
                                                    <TableCell>{order.status?.nama ?? "-"}</TableCell>
                                                    <TableCell>{order.driver?.name ?? "-"}</TableCell>
                                                    <TableCell>{order.vehicle?.nama_kendaraan ?? "-"}</TableCell>
                                                    <TableCell>{order.total_weight}</TableCell>
                                                    <TableCell>{order.total_volume}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Link href={`/job-order/${order.id}`}>
                                                            <Button variant="ghost" size="icon" title="View Detail">
                                                                <EyeIcon className="h-5 w-5 text-foreground" />
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-center text-muted-foreground py-6">
                                                    No data found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                <div className="flex justify-between items-center mt-6">
                                    <p className="text-sm text-muted-foreground">
                                        Page {currentPage} of {totalPages || 1}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handlePrev}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleNext}
                                            disabled={currentPage === totalPages || totalPages === 0}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}
