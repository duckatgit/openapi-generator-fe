'use client'
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";


export default function Home() {
  const [org, setOrg] = useState<any>([])
  const [createOrgDetails, setCreateOrgDetails] = useState({
    domain: "",
    organizationName: "",
    organizationIDFileLink: "",
    governmentIDFileLink: ""
  })

  const getOrgList = async () => {
    let config = {
      headers: {
        "Authorization": process.env.NEXT_PUBLIC_BEARER_TOKEN,
      }
    }
    const getList = await axios.get(`https://api.wavital.ai/api/v1/user/organizations`, config)

    if (getList.status == 200) {
      setOrg(getList.data?.organizations)
    }
    else {
      setOrg([])
    }
  }

  const deleteOrg = async (id: string) => {
    let config = {
      headers: {
        "Authorization": process.env.NEXT_PUBLIC_BEARER_TOKEN,
      }
    }
    const getList = await axios.delete(`https://api.wavital.ai/api/v1/organization/${id}`, config)

    if (getList.status == 200) {
      getOrgList()
    }
  }

  const createOrg = async () => {
    let config = {
      headers: {
        "Authorization": process.env.NEXT_PUBLIC_BEARER_TOKEN,
      }
    }
    await axios.post(`https://api.wavital.ai/api/v1/organization`, {
      domain: createOrgDetails.domain,
      organizationName: createOrgDetails.organizationName,
      organizationIDFileLink: createOrgDetails.organizationIDFileLink,
      governmentIDFileLink: createOrgDetails.governmentIDFileLink
    }, config).then(() => {
      getOrgList()
    })
  }

  useEffect(() => {
    getOrgList()
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {org?.map((item: any) => {
            return (
              <TableRow>
                <TableCell className="font-medium">{item?.id}</TableCell>
                <TableCell>{item?.organizationName}</TableCell>
                <TableCell>
                  <button
                    className="bg-red-200 py-2 px-10 rounded-md"
                    onClick={() => {
                      deleteOrg(item?.id)
                    }}
                  >Delete</button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}
