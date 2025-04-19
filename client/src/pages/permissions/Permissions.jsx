"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Users, UserPlus, UserMinus, Settings, ArrowLeft, Check, Folder } from "lucide-react"

export default function Permissions() {
  const [activeTab, setActiveTab] = useState("requested")
  const [selectedFolders, setSelectedFolders] = useState([])

   

  const requestedPermissions = [
    {
      id: 1,
      name: "Mayo Clinic",
      description: "Requested to access your medical records and share data between their departments",
      date: "2023/05/12",
    },
    {
      id: 2,
      name: "Cleveland Clinic",
      description: "Requested to access your medical records for consultation",
      date: "2023/05/10",
    },
  ]

  const toggleFolder = (id) => {
    if (selectedFolders.includes(id)) {
      setSelectedFolders(selectedFolders.filter((folderId) => folderId !== id))
    } else {
      setSelectedFolders([...selectedFolders, id])
    }
  }

  const folders = [
    { id: 1, name: "Medical Records" },
    { id: 2, name: "Lab Results" },
    { id: 3, name: "Prescriptions" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Permissions Management</h1>
         
      </div>

      {/* Permission Interface based on Figma */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("requested")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "requested" ? "border-b-2 border-[#9B65FF] text-[#9B65FF]" : "text-gray-500"}`}
          >
            Requested
          </button>
          <button
            onClick={() => setActiveTab("granted")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "granted" ? "border-b-2 border-[#9B65FF] text-[#9B65FF]" : "text-gray-500"}`}
          >
            Granted
          </button>
          <button
            onClick={() => setActiveTab("revoked")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "revoked" ? "border-b-2 border-[#9B65FF] text-[#9B65FF]" : "text-gray-500"}`}
          >
            Revoked
          </button>
        </div>

        {activeTab === "requested" && (
          <div className="p-6">
            {requestedPermissions.map((permission) => (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 last:mb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{permission.name}</h3>
                    <p className="text-sm text-gray-500">{permission.description}</p>
                  </div>
                  <div className="text-xs text-gray-400">Date: {permission.date}</div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                    Deny
                  </button>
                  <button
                    onClick={() => setActiveTab("folderSelect")}
                    className="px-4 py-2 bg-[#9B65FF] text-white rounded-md hover:bg-[#8A50F0] transition-colors"
                  >
                    Grant Access
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "folderSelect" && (
          <div className="p-6">
            <button onClick={() => setActiveTab("requested")} className="flex items-center gap-2 text-[#9B65FF] mb-4">
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <h3 className="font-medium mb-4">Select folders to grant access to:</h3>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {folders.map((folder) => (
                <motion.div
                  key={folder.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleFolder(folder.id)}
                  className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center transition-colors ${
                    selectedFolders.includes(folder.id) ? "border-[#9B65FF] bg-[#9B65FF]/5" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      selectedFolders.includes(folder.id) ? "bg-[#9B65FF] text-white" : "bg-gray-100"
                    }`}
                  >
                    <Folder size={24} />
                  </div>
                  <span className="mt-2 text-sm font-medium">{folder.name}</span>
                  {selectedFolders.includes(folder.id) && (
                    <div className="absolute top-2 right-2 text-[#9B65FF]">
                      <Check size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#9B65FF] text-white rounded-lg hover:bg-[#8A50F0] transition-colors"
              >
                Accept
              </motion.button>
            </div>
          </div>
        )}

        {activeTab === "granted" && (
          <div className="p-6">
            <p className="text-gray-500">No permissions have been granted yet.</p>
          </div>
        )}

        {activeTab === "revoked" && (
          <div className="p-6">
            <p className="text-gray-500">No permissions have been revoked yet.</p>
          </div>
        )}
      </motion.div>

      {/* Permission Matrix */}
       
    </div>
  )
}
