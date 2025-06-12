"use client"

import { useState, useEffect } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppState } from "@/components/state-provider";
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Ban } from "lucide-react"

export default function CountdownTimer() {
    const [initialTime] = useState(3600)
    const [showConfirmReset, setShowConfirmReset] = useState(false);
    const [customMinutes, setCustomMinutes] = useState("")
    const {
        secureReset,
        totalSeconds,
        setTotalSeconds,
        isRunning,
        setIsRunning,
    } = useAppState();


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isRunning) {
            interval = setInterval(() => {
                setTotalSeconds(totalSeconds - 1)
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, setTotalSeconds, totalSeconds])

    const formatTime = (seconds: number) => {
        const sign = seconds < 0 ? "-" : ""
        const absSeconds = Math.abs(seconds)
        const hours = Math.floor(absSeconds / 3600)
        const minutes = Math.floor((absSeconds % 3600) / 60)
        const remainingSeconds = absSeconds % 60
        return `${sign}${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const handleStart = () => setIsRunning(true)
    const handlePause = () => setIsRunning(false)
    const handleReset = () => {
        setIsRunning(false)
        setTotalSeconds(initialTime)
    }

    const adjustTime = (minutes: number) => {
        setTotalSeconds(totalSeconds + minutes * 60)
    }

    const handleCustomTime = () => {
        const minutes = parseInt(customMinutes)
        if (!isNaN(minutes)) {
            adjustTime(minutes)
            setCustomMinutes("")
        }
    }

    const timeColorClass =
        totalSeconds <= 0
            ? "text-red-500"
            : totalSeconds <= 300
                ? "text-orange-500"
                : "text-foreground"

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>TIMER CONTROLS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <div className={`text-6xl font-mono font-bold ${timeColorClass}`}>
                        {formatTime(totalSeconds)}
                    </div>
                </div>

                <div className="flex justify-center gap-2">
                    {!isRunning ? (
                        <Button onClick={handleStart} className="cursor-pointer flex items-center gap-2">
                            <Play className="h-4 w-4" /> Start
                        </Button>
                    ) : (
                        <Button onClick={handlePause} variant="secondary" className="cursor-pointer flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                            <Pause className="h-4 w-4" /> Pause
                        </Button>
                    )}

                    {/* AlertDialog for Reset */}
                    <Button
                        variant="outline"
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => {
                            if (secureReset) {
                                setShowConfirmReset(true);
                            } else {
                                handleReset();
                            }
                        }}
                    >
                        <RotateCcw className="h-4 w-4" /> Reset
                    </Button>

                    <AlertDialog open={showConfirmReset} onOpenChange={setShowConfirmReset}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Reset the timer?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will stop the timer and reset it to 01:00:00.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setShowConfirmReset(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        handleReset();
                                        setShowConfirmReset(false);
                                    }}
                                >
                                    Yes, reset
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>

                <div className="grid grid-cols-3 gap-2">
                    {[1, 3, 5].map((min) => (
                        <Button key={`add-${min}`} onClick={() => adjustTime(min)} size="sm" variant="default" className="cursor-pointer">
                            + {min} minute{min > 1 ? "s" : ""}
                        </Button>
                    ))}
                    {[1, 3, 5].map((min) => (
                        <Button key={`remove-${min}`} onClick={() => adjustTime(-min)} size="sm" variant="destructive" className="cursor-pointer">
                            - {min} minute{min > 1 ? "s" : ""}
                        </Button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Add a custom amount of minutes"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(e.target.value)}
                    />
                    <Button
                        onClick={handleCustomTime}
                        className="cursor-pointer"
                        disabled={customMinutes.trim() === "" || isNaN(Number(customMinutes))}
                    >
                        {customMinutes.trim() === "" || isNaN(Number(customMinutes))
                            ? <Ban />
                            : `${Number(customMinutes) >= 0 ? "Add" : "Remove"} ${Math.abs(Number(customMinutes))} minute${Math.abs(Number(customMinutes)) !== 1 ? "s" : ""}`}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
