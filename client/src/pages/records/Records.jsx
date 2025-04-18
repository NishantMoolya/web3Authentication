"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Plus, Search, Filter, MoreHorizontal, Download, Trash2, Edit } from "lucide-react"

export default function Records() {
  const [records] = useState([
    { id: 1, name: "Annual Report 2023", type: "PDF", size: "2.4 MB", date: "2023-12-15", status: "Active" },
    { id: 2, name: "Q4 Financial Statement", type: "XLSX", size: "1.8 MB", date: "2023-11-30", status: "Active" },
    { id: 3, name: "Marketing Strategy", type: "DOCX", size: "3.2 MB", date: "2023-10-22", status: "Archived" },
    { id: 4, name: "User Research Results", type: "PDF", size: "5.7 MB", date: "2023-09-18", status: "Active" },
    { id: 5, name: "Product Roadmap", type: "PPTX", size: "4.1 MB", date: "2023-08-05", status: "Active" },
    { id: 6, name: "Employee Handbook", type: "PDF", size: "1.5 MB", date: "2023-07-12", status: "Archived" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Records Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9B65FF] to-[#F2613F] text-white rounded-lg hover:opacity-90 transition-opacity">
          <Plus size={18} />
          <span>Add Record</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9B65FF]/30 focus:border-[#9B65FF]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Type</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Size</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 text-right font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <motion.tr
                  key={record.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          record.type === "PDF"
                            ? "bg-red-100 text-red-600"
                            : record.type === "XLSX"
                              ? "bg-green-100 text-green-600"
                              : record.type === "DOCX"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        <FileText size={16} />
                      </div>
                      <span className="font-medium">{record.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{record.type}</td>
                  <td className="py-3 px-4">{record.size}</td>
                  <td className="py-3 px-4">{record.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 rounded-md hover:bg-gray-100" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100" title="More">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{" "}
            <span className="font-medium">6</span> records
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded border border-gray-200 text-sm font-medium disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded border border-gray-200 text-sm font-medium disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
