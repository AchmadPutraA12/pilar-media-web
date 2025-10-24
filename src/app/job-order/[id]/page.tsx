"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Layout from "@/layout/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface Location {
    id: number
    type: string
    address: string
    lat: string
    lng: string
    province: string
    city: string
    district: string
}

interface Manifest {
    id: number
    item_name: string
    quantity: number
    weight: number
    volume: number
    notes?: string
}

interface JobOrder {
    id: number
    transaction_number: string
    customer_name: string
    status: { nama: string }
    driver: { name: string }
    vehicle: { nama_kendaraan: string }
    pickup_address: string
    destination_address: string
    total_weight: number
    total_volume: number
    created_at?: string
    manifests: Manifest[]
    locations: Location[]
}

interface DistanceData {
    distance: {
        distance_km: number
        duration_minutes: number
    }
    cost: {
        name: string
        service: string
        description: string
        cost: number
        etd: string
    }[]
}

export default function JobOrderDetailPage() {
    const { id } = useParams()
    const [job, setJob] = useState<JobOrder | null>(null)
    const [distanceData, setDistanceData] = useState<DistanceData | null>(null)
    const [showMap, setShowMap] = useState<{ [key: number]: boolean }>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchJob() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job-orders/${id}`)
                if (!res.ok) throw new Error("Failed to fetch job order detail")
                const data = await res.json()
                setJob(data)

                const distRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job-orders/${id}/distance`)
                if (!distRes.ok) throw new Error("Failed to fetch distance/cost data")
                const distData = await distRes.json()
                setDistanceData(distData)
            } catch (err: any) {
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchJob()
    }, [id])

    if (loading)
        return (
            <Layout>
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mr-2" />
                    <span>Loading job order details...</span>
                </div>
            </Layout>
        )

    if (error)
        return (
            <Layout>
                <p className="text-red-500 text-center mt-10">{error}</p>
            </Layout>
        )

    if (!job)
        return (
            <Layout>
                <p className="text-muted-foreground text-center mt-10">Job order not found.</p>
            </Layout>
        )

    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Job Order Detail</h1>
                    <p className="text-muted-foreground mt-1">Information and delivery details</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📦 Job Info</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p><strong>Job Number:</strong> {job.transaction_number}</p>
                            <p><strong>Customer:</strong> {job.customer_name}</p>
                            <p><strong>Status:</strong> {job.status?.nama ?? "-"}</p>
                            <p><strong>Pickup:</strong> {job.pickup_address}</p>
                            <p><strong>Destination:</strong> {job.destination_address}</p>
                            <p><strong>Driver:</strong> {job.driver?.name ?? "-"}</p>
                            <p><strong>Vehicle:</strong> {job.vehicle?.nama_kendaraan ?? "-"}</p>
                            <p><strong>Total Weight:</strong> {job.total_weight} kg</p>
                            <p><strong>Total Volume:</strong> {job.total_volume} m³</p>
                            <p><strong>Created At:</strong> {new Date(job.created_at || "").toLocaleString()}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">📍 Location Timeline</h3>
                            {job.locations.map((loc) => (
                                <div key={loc.id} className="border rounded-lg p-3 mb-3 bg-muted/40">
                                    <p className="font-semibold text-blue-600 capitalize">{loc.type}</p>
                                    <p>{loc.address}</p>
                                    <p>Lat: {loc.lat} | Lng: {loc.lng}</p>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="mt-2"
                                        onClick={() =>
                                            setShowMap((prev) => ({ ...prev, [loc.id]: !prev[loc.id] }))
                                        }
                                    >
                                        {showMap[loc.id] ? "Hide Map" : "Track via Map"}
                                    </Button>
                                    {showMap[loc.id] && (
                                        <iframe
                                            src={`https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=14&output=embed`}
                                            width="100%"
                                            height="250"
                                            className="mt-3 rounded-lg border"
                                            loading="lazy"
                                        ></iframe>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>📦 Manifests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Weight (kg)</TableHead>
                                    <TableHead>Volume (m³)</TableHead>
                                    <TableHead>Notes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {job.manifests.length > 0 ? (
                                    job.manifests.map((m) => (
                                        <TableRow key={m.id}>
                                            <TableCell>{m.item_name}</TableCell>
                                            <TableCell>{m.quantity}</TableCell>
                                            <TableCell>{m.weight}</TableCell>
                                            <TableCell>{m.volume}</TableCell>
                                            <TableCell>{m.notes ?? "-"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No manifests found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>🛣️ Distance & Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {distanceData ? (
                            <>
                                <p><strong>Distance:</strong> {distanceData.distance.distance_km.toFixed(2)} km</p>
                                <p><strong>Duration:</strong> {distanceData.distance.duration_minutes.toFixed(2)} minutes</p>

                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2">💰 Shipping Cost Estimation</h4>
                                    {distanceData.cost.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Courier</TableHead>
                                                    <TableHead>Service</TableHead>
                                                    <TableHead>Description</TableHead>
                                                    <TableHead>Cost (Rp)</TableHead>
                                                    <TableHead>ETD</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {distanceData.cost.map((c, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{c.name}</TableCell>
                                                        <TableCell>{c.service}</TableCell>
                                                        <TableCell>{c.description}</TableCell>
                                                        <TableCell>{c.cost.toLocaleString("id-ID")}</TableCell>
                                                        <TableCell>{c.etd || "-"}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <p className="text-muted-foreground">No shipping cost data available.</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="text-muted-foreground">No distance or cost data.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}
