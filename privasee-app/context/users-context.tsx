"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "@/lib/types";
import { toast } from "react-hot-toast";

interface UsersContextType {
    users: UserType[];
    createUser: (email: string, name: string) => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers must be used within a UsersProvider");
    }
    return context;
};

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [setUsers]);



    const createUser = async (email: string, name: string) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });

            if (!response.ok) {
                toast.error("Failed to create question")
                throw new Error("Failed to create question");
            }

            const newUser = await response.json();
            setUsers((prevUsers) => [...prevUsers, newUser]);

        } catch (error: any) {
            toast.error(`Error adding question: ${error?.message}`);
        }
    };





    return (
        <UsersContext.Provider value={{ users, createUser }}>
            {children}
        </UsersContext.Provider>
    );
};
