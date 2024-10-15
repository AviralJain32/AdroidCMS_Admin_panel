"use client"
import Loader from '@/components/Loader'
import { useGetAllUsersQuery } from '@/store/features/UserData'
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '../../../components/DataTable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { IUser } from '@/model/User'

const columns: ColumnDef<IUser>[] = [
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
    accessorKey: "fullname",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "affilation",
    header: "Affilation",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "isVerified",
    header: "Verified User ",
  },
]

const Page = () => {

  
    const { data: AllUsers, error: UserError, isLoading: loadingUsers } = useGetAllUsersQuery()

    if(loadingUsers){
      return <Loader/>
    }
  return (
    <div className='container mx-auto flex-col  justify-between items-center'>
      {!UserError ? 
        <div>
      {AllUsers && <DataTable columns={columns} data={AllUsers} /> }
      </div>
      :  
      <div>An Error has been occured while fetching all the users</div>}
    </div>
  )
}

export default Page
