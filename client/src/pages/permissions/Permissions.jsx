"use client"
import { motion } from "framer-motion"
import { Shield, Users, UserPlus, UserMinus, Settings } from "lucide-react"

export default function Permissions() {
  const roleCards = [
    {
      id: 1,
      role: "Administrator",
      users: 3,
      description: "Full access to all settings and features",
      icon: <Shield size={24} />,
      color: "from-[#9B65FF] to-indigo-400",
    },
    {
      id: 2,
      role: "Manager",
      users: 8,
      description: "Access to most features except system settings",
      icon: <Users size={24} />,
      color: "from-[#F2613F] to-orange-300",
    },
    {
      id: 3,
      role: "Editor",
      users: 15,
      description: "Can edit content but cannot modify settings",
      icon: <UserPlus size={24} />,
      color: "from-emerald-500 to-teal-300",
    },
    {
      id: 4,
      role: "Viewer",
      users: 42,
      description: "Read-only access to content",
      icon: <UserMinus size={24} />,
      color: "from-blue-500 to-cyan-300",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Permissions Management</h1>
      </div>

       

      {/* Permission Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-500">Feature</th>
                <th className="py-3 px-4 text-center font-medium text-gray-500">Administrator</th>
                <th className="py-3 px-4 text-center font-medium text-gray-500">Manager</th>
                <th className="py-3 px-4 text-center font-medium text-gray-500">Editor</th>
                <th className="py-3 px-4 text-center font-medium text-gray-500">Viewer</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "View Dashboard", admin: true, manager: true, editor: true, viewer: true },
                { feature: "Edit Records", admin: true, manager: true, editor: true, viewer: false },
                { feature: "Delete Records", admin: true, manager: true, editor: false, viewer: false },
                { feature: "Manage Users", admin: true, manager: true, editor: false, viewer: false },
                { feature: "System Settings", admin: true, manager: false, editor: false, viewer: false },
              ].map((row, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-3 px-4 font-medium">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {row.admin ? (
                      <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        ×
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.manager ? (
                      <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        ×
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.editor ? (
                      <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        ×
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.viewer ? (
                      <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        ×
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
