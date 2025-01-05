"use client"
import Loader from '@/components/Loader'
import { useGetAllUsersQuery } from '@/store/features/UserData'
import React, { useEffect, useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '../../../components/DataTable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { IUser } from '@/model/User'
import axios from 'axios'

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

  
//     const { data: AllUsers, error: UserError, isLoading: loadingUsers } = useGetAllUsersQuery(undefined,{
//       refetchOnMountOrArgChange: true, // Force refetch on mount
// })

const [users, setUsers] = useState<IUser[] | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      // Making the API call using Axios
      const response = await axios.get('/api/get-all-users');

      // Handling response
      if (response.data.success) {
        setUsers(response.data.data); // Save data to state
      } else {
        throw new Error(response.data.message); // Throw error if response is unsuccessful
      }
    } catch (err:any) {
      setError(err.message || 'An error occurred'); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  fetchUsers(); // Call the fetch function when the component mounts

}, []); // Empty array, so the effect runs only once when the component mounts


    if(loading){
      return <Loader/>
    }
  return (
    <div className='container mx-auto flex-col  justify-between items-center'>
      {!error ? 
        <div>
      {users && <DataTable columns={columns} data={users} /> }
      </div>
      :  
      <div>An Error has been occured while fetching all the users</div>}
    </div>
  )
}

export default Page
