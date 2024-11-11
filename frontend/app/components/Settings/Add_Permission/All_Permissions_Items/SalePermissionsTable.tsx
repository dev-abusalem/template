"use client";

import React, { useState } from "react";

const SalePermissionsTable: React.FC = () => {
  // State to track individual checkbox selections
  const [permissions, setPermissions] = useState({
    create: Array(5).fill(false),
    read: Array(5).fill(false),
    update: Array(5).fill(false),
    delete: Array(5).fill(false),
  });

  // Handle individual checkbox change
  const handleCheckboxChange = (
    type: "create" | "read" | "update" | "delete",
    index: number
  ) => {
    setPermissions((prevPermissions) => {
      const updated = [...prevPermissions[type]];
      updated[index] = !updated[index]; // Toggle checkbox state
      return {
        ...prevPermissions,
        [type]: updated,
      };
    });
  };

  // Handle "Check All" checkbox change
  const handleCheckAll = (type: "create" | "read" | "update" | "delete") => {
    const allChecked = permissions[type].every((checked) => checked);
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [type]: Array(5).fill(!allChecked), // Check/Uncheck all based on current state
    }));
  };

  return (
    <div className="mt-2 mb-6 px-4">
      <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
        <h2 className="text-xl text-gray-800 font-bold mb-4">Sale</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Sl No</th>
              <th className="border border-gray-300 px-4 py-2">Menu Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Create (
                <label htmlFor="checkAllcreate0">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckAll("create")}
                    checked={permissions.create.every((checked) => checked)}
                    id="checkAllcreate0"
                    className="mr-1"
                  />
                  All
                </label>
                )
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Read (
                <input
                  type="checkbox"
                  onChange={() => handleCheckAll("read")}
                  checked={permissions.read.every((checked) => checked)}
                  id="checkAllread0"
                  className="mr-1"
                />
                all)
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Update (
                <input
                  type="checkbox"
                  onChange={() => handleCheckAll("update")}
                  checked={permissions.update.every((checked) => checked)}
                  id="checkAlledit0"
                  className="mr-1"
                />
                all)
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Delete (
                <input
                  type="checkbox"
                  onChange={() => handleCheckAll("delete")}
                  checked={permissions.delete.every((checked) => checked)}
                  id="checkAlldelete0"
                  className="mr-1"
                />
                all)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: "New Sale" },
              { id: 2, name: "Manage Sale" },
              { id: 3, name: "POS Sale" },
              { id: 4, name: "Sales Terms List" },
              { id: 5, name: "Add Sales Terms" },
            ].map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                  <input
                    type="hidden"
                    name={`fk_module_id[0][${index}][]`}
                    value={item.id}
                    id={`id_${item.id}`}
                  />
                </td>
                {["create", "read", "update", "delete"].map((action, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    <div className="checkbox checkbox-success text-center">
                      <input
                        type="checkbox"
                        name={`${action}[0][${index}][]`}
                        value="1"
                        id={`${action}0${index}`}
                        className={`${action}0`}
                        checked={
                          permissions[action as keyof typeof permissions][index]
                        }
                        onChange={() =>
                          handleCheckboxChange(
                            action as keyof typeof permissions,
                            index
                          )
                        }
                      />
                      <label htmlFor={`${action}0${index}`} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalePermissionsTable;
