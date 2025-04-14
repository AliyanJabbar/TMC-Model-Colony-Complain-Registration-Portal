"use client"

import { useEffect, useState } from "react"
import { useToast } from "../../../hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Complaint {
  _id: string
  type: string
  address: string
  message: string
  status: string
  response?: string
  createdAt: string
}

export default function ComplaintStatus() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const response = await fetch("/api/complaints")
        if (!response.ok) {
          throw new Error("Failed to fetch complaints")
        }
        const data = await response.json()
        setComplaints(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load complaints. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [toast])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center">Loading complaints...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Complaints</h1>
        {complaints.length === 0 ? (
          <p className="text-center text-muted-foreground">No complaints found.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint._id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="capitalize">{complaint.type} Issue</CardTitle>
                    <Badge variant={complaint.status === "resolved" ? "default" : "secondary"}>
                      {complaint.status}
                    </Badge>
                  </div>
                  <CardDescription>Submitted on {new Date(complaint.createdAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-sm text-muted-foreground">{complaint.address}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Complaint Details</h4>
                    <p className="text-sm text-muted-foreground">{complaint.message}</p>
                  </div>
                  {complaint.response && (
                    <div>
                      <h4 className="font-medium mb-1">Admin Response</h4>
                      <p className="text-sm text-muted-foreground">{complaint.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

