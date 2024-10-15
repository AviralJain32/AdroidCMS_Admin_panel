"use client"
import Loader from '@/components/Loader'
import { useGetAllUsersQuery } from '@/store/features/UserData'
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '../../../components/DataTable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { useGetAllConferencesQuery } from '@/store/features/ConferenceData'
import { IConference } from '@/model/ConferenceSchema'
import { usePathname, useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'


const Page = () => {

  const router=useRouter()
  const pathname=usePathname()

  const columns: ColumnDef<IConference>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "conferenceAcronym",
      header: "Conference Acronym",
    },
    {
      accessorKey: "conferenceEmail",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className='text-lg'
          >
            Conference Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "conferenceOrganizer.fullname",
      header: "Organized By",
    },
    {
      accessorFn: (row) => row.conferenceStatus,
      header: "Conference Status",
      cell: (info) => {
        const value = info.getValue();
        switch (value) {
          case "submitted":
            return <Badge variant="submitted" className='text-md'>Submitted</Badge>;
          case "accepted":
            return <Badge variant="accepted" className='text-md'>Accepted</Badge>;
          case "rejected":
            return <Badge variant="rejected" className='text-md'>Rejected</Badge>;
          case "review":
            return <Badge variant="review" className='text-md'>Review</Badge>;
          default:
            return <Badge variant="submitted" className='text-md'>Submitted</Badge>;
        }
      }
    },    
    {
      // Location Column (comprising Venue, City, Country)
      header: "Location",
      accessorFn: (row) =>
        `${row.conferenceVenue}, ${row.conferenceCity}, ${row.conferenceCountry}`,
      footer: "Location",
    },
    {
      accessorFn:(row)=>row.conferenceSecurityDeposit2000Paid,
      header: "Premium Customer",
      cell:info=>(
        info.getValue() ? <Badge className='text-md' variant={'premium'}>Premium</Badge> : <Badge className='text-md' variant={"default"}>No</Badge>
      )
    },
    {
      header: "Information",
      accessorFn: row=>row.conferenceAcronym,
      footer: "Information",
      cell:info=>(
        <Button variant={'outline'} onClick={()=>router.push(`${pathname}/${info.getValue()}`)}>Open</Button>
      )
    },
  ]

  
    const { data: AllConferences, error: ConferencesError, isLoading: loadingConferences } = useGetAllConferencesQuery()

    if(loadingConferences){
      return <Loader/>
    }
  return (
    <div className='container mx-auto flex-col  justify-between items-center'>
      {!ConferencesError ? 
        <div>
      {AllConferences && <DataTable columns={columns} data={AllConferences} /> }
      </div>
      :  
      <div>An Error has been occured while fetching all the users</div>}
    </div>
  )
}

export default Page
