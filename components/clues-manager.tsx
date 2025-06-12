"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquareOff, History, Sticker } from "lucide-react"
import cluesData from "@/data/clues.json"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAppState } from "./state-provider"

type Language = keyof typeof cluesData

const LANGUAGES: Language[] = ["en", "fr", "nl"]

export default function ClueManager() {
    const { clueHistory, history, setHistory } = useAppState()
    const [language, setLanguage] = useState<Language>("en")
    const [clues, setClues] = useState<string[]>([])
    const [selectedClue, setSelectedClue] = useState("")
    const [liveClue, setLiveClue] = useState("")

    useEffect(() => {
        const langClues = cluesData[language] || []
        setClues(langClues)
        setSelectedClue("")
    }, [language])

    const handleSend = () => {
        const trimmed = selectedClue.trim();
        if (trimmed) {
            setLiveClue(trimmed);
            const newEntry = {
                message: trimmed,
                timestamp: new Date().toLocaleString(), // you can customize format
            };
            setHistory([newEntry, ...history.slice(0, 5)]); // Keep last 6
            setSelectedClue("");
            console.log(`Sent clue in ${language}:`, trimmed);
        }
    };


    const handleClear = () => {
        setLiveClue("")
    }

    const handleClueSelect = (clue: string) => {
        setSelectedClue(clue)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 mt-4">
                        {LANGUAGES.map((lang) => (
                            <Button
                                key={lang}
                                className="cursor-pointer"
                                variant={lang === language ? "default" : "ghost"}
                                onClick={() => setLanguage(lang)}
                            >
                                {lang.toUpperCase()}
                            </Button>
                        ))}
                    </div>
                    <CardTitle>{clueHistory && <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="cursor-pointer">
                                <History />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="mb-4">History of clues</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {history.length === 0 ? (
                                        <div className="border-dashed min-h-[100px] border-2 rounded-md p-4 text-center text-muted-foreground bg-muted flex flex-col items-center justify-center gap-2">
                                            <Sticker className="h-15 w-15" />
                                            No clues sent yet
                                        </div>
                                    ) : (
                                        <div className="space-y-4 overflow-y-auto max-h-[400px] relative">
                                            {history.map((item, idx) => {
                                                // Calculate opacity based on position (0 = newest, higher = older)
                                                const opacity = Math.max(0.2, 1 - (idx * 0.15));

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="border rounded-lg p-4 bg-secondary text-foreground shadow-sm transition-all duration-300 ease-in-out"
                                                        style={{
                                                            opacity: opacity
                                                        }}
                                                    >
                                                        <p className="font-semibold">{item.message}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                                                    </div>
                                                );
                                            })}

                                            {/* Optional: Add a subtle gradient overlay at the bottom */}
                                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
                                        </div>
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>}</CardTitle>
                </div>

            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Clue Selection</Label>
                    <Select value={clues.includes(selectedClue) ? selectedClue : ""} onValueChange={handleClueSelect}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="No clue selected" />
                        </SelectTrigger>
                        <SelectContent>
                            {clues.map((clue, idx) => (
                                <SelectItem key={idx} value={clue}>
                                    {clue}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Preview</Label>
                    <Textarea
                        value={selectedClue}
                        onChange={(e) => setSelectedClue(e.target.value)}
                        placeholder="Edit or write a clue..."
                    />
                    <Button className="mt-2 cursor-pointer" disabled={selectedClue.trim() === ""} onClick={() => setSelectedClue("")}>Clear preview</Button>
                </div>

                <div className="space-y-2">
                    <Label>Live Message</Label>
                    {liveClue ? (
                        <div className="border min-h-[100px] rounded-md p-4 text-center font-semibold text-lg transition-colors flex items-center justify-center bg-secondary text-foreground">
                            {liveClue}
                        </div>
                    ) : (
                        <div className="border-dashed min-h-[100px] border-2 rounded-md p-4 text-center text-muted-foreground bg-muted flex flex-col items-center justify-center gap-2">
                            <MessageSquareOff className="h-6 w-6" />
                            No clue is currently displayed on screen
                        </div>
                    )}
                </div>

            </CardContent>

            <CardFooter className="flex gap-4">
                <Button className="cursor-pointer flex-1" onClick={handleSend} disabled={selectedClue.trim() === ""}>
                    Send message to screen
                </Button>
                <Button variant="outline" className=" cursor-pointer flex-1 bg-gray-300" onClick={handleClear} disabled={!liveClue}>
                    Clear live message
                </Button>
            </CardFooter>
        </Card >
    )
}
