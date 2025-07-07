import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p className="text-gray-600 mb-8">Manage conferences, users, and system settings efficiently</p>
      </div>

      {/* Action Buttons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Manage Conferences */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-xl font-semibold mb-4">Manage Conferences</h2>
          <p className="text-gray-500 mb-4">
            View, edit, and approve conferences. Keep track of submissions and updates.
          </p>
          <Link href="/conferences">
            <Button variant="default" className="w-full">
              Go to Conferences
            </Button>
          </Link>
        </div>

        {/* Manage Users */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <p className="text-gray-500 mb-4">
            View, add, and manage user accounts and permissions.
          </p>
          <Link href="/users">
            <Button variant="default"  className="w-full">
              Go to Users
            </Button>
          </Link>
        </div>

        {/* System Settings */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <p className="text-gray-500 mb-4">
            Configure application settings, manage roles, and other admin tasks.
          </p>
          <Link href="/settings">
            <Button variant="default" className="w-full">
              Go to Settings
            </Button>
          </Link>
        </div> */}
      </div>

      {/* Footer Section */}
      <div className="text-center mt-16">
        <p className="text-gray-500">Powered by Adroid CMS</p>
      </div>
    </div>
  );
};

export default Page;
