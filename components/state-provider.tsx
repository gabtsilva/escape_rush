"use client";

import React, { createContext, useContext, useState } from "react";

type StateContextType = {
    secureReset: boolean;
    setSecureReset: (value: boolean) => void;
    clueHistory: boolean;
    setClueHistory: (value: boolean) => void;
    history: ClueHistoryItem[];
    setHistory: (value: ClueHistoryItem[]) => void;

    totalSeconds: number;
    setTotalSeconds: (value: number) => void;
    isRunning: boolean;
    setIsRunning: (value: boolean) => void;
};

type ClueHistoryItem = {
    message: string;
    timestamp: string;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [secureReset, setSecureReset] = useState(true);
    const [clueHistory, setClueHistory] = useState(false);
    const [history, setHistory] = useState<ClueHistoryItem[]>([])
    const [totalSeconds, setTotalSeconds] = useState(3600);
    const [isRunning, setIsRunning] = useState(false);

    return (
        <StateContext.Provider
            value={{
                secureReset,
                setSecureReset,
                clueHistory,
                setClueHistory,
                history,
                setHistory,
                totalSeconds,
                setTotalSeconds,
                isRunning,
                setIsRunning,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useAppState must be used within a StateProvider");
    }
    return context;
};
