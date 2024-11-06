'use client'
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import axios from "axios";


export default function Home() {
  const [createOrgDetails, setCreateOrgDetails] = useState({
    domain: "",
    organizationName: "",
    organizationIDFileLink: "",
    governmentIDFileLink: ""
  })
  const [analyticsData, setAnalyticsData] = useState<any>()

  const createOrg = async () => {
    await axios.post(`http://localhost:3001/users/register`, {
      domain: createOrgDetails.domain,
      organizationName: createOrgDetails.organizationName,
      organizationIDFileLink: createOrgDetails.organizationIDFileLink,
      governmentIDFileLink: createOrgDetails.governmentIDFileLink
    })
  }

  const analytics = async () => {
    await axios.get(`http://localhost:3001/pets/filterpet`).then((res) => {
      console.log('res.data.result', res.data.result)
      setAnalyticsData(res.data.result)
    })
  }

  useEffect(() => {
    analytics()
  }, [])


  return (
    <div className="w-screen h-screen">
      <div className="w-full flex justify-end pt-10 pr-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Organization</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Organization</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <Input id="domain" placeholder="domain" className="col-span-3"
                  onChange={(e) => {
                    setCreateOrgDetails({
                      domain: e.target.value,
                      organizationName: createOrgDetails.organizationName,
                      organizationIDFileLink: createOrgDetails.organizationIDFileLink,
                      governmentIDFileLink: createOrgDetails.governmentIDFileLink
                    })
                  }} />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Input id="organizationName" placeholder="organizationName" className="col-span-3"
                  onChange={(e) => {
                    setCreateOrgDetails({
                      domain: createOrgDetails.domain,
                      organizationName: e.target.value,
                      organizationIDFileLink: createOrgDetails.organizationIDFileLink,
                      governmentIDFileLink: createOrgDetails.governmentIDFileLink
                    })
                  }}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Input id="organizationIDFileLink" placeholder="organizationIDFileLink" className="col-span-3"
                  onChange={(e) => {
                    setCreateOrgDetails({
                      domain: createOrgDetails.domain,
                      organizationName: createOrgDetails.organizationName,
                      organizationIDFileLink: e.target.value,
                      governmentIDFileLink: createOrgDetails.governmentIDFileLink
                    })
                  }}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Input id="organizationIDFileLink" placeholder="organizationIDFileLink" className="col-span-3"
                  onChange={(e) => {
                    setCreateOrgDetails({
                      domain: createOrgDetails.domain,
                      organizationName: createOrgDetails.organizationName,
                      organizationIDFileLink: createOrgDetails.organizationIDFileLink,
                      governmentIDFileLink: e.target.value
                    })
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={createOrg}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full ml-4 flex gap-10 ">
        <Card>
          <CardHeader>
            <CardTitle>ordered</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analyticsData?.ordered}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analyticsData?.approved}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>placed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analyticsData?.placed}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>test</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analyticsData?.test}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analyticsData?.pending}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>deliver</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analyticsData?.deliver}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analyticsData?.delivered}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
