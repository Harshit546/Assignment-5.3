"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { setUsers } from "../src/store/usersSlice";
import type { RawUser, User } from "../src/types";
import UserCard from "../src/components/UserCard";
import EditModal from "../src/components/EditModal";
import axios from "axios";

// Fetches the user from the API and returns RawUser
async function fetchUsers(): Promise<RawUser[]> {
  const response = await axios.get<RawUser[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.users.list);

  // Runs the fetchUsers function automatically
  const { data, isLoading, error } = useQuery<RawUser[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Local state to know which user is being edited
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // When Tanstack Query fetches data, it dispatches data to store users in Redux
  useEffect(() => {
    if (data) dispatch(setUsers(data));
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((u) => (
          <UserCard key={u.id} user={u} onEdit={() => setEditingUser(u)} />
        ))}
      </div>

      {editingUser && (
        <EditModal user={editingUser} onClose={() => setEditingUser(null)} />
      )}
    </div>
  );
}
