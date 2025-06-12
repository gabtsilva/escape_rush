"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquareOff, History } from "lucide-react"
import cluesData from "@/data/clues.json"

type Language = keyof typeof cluesData

const LANGUAGES: Language[] = ["en", "fr", "nl"]

export default function ClueManager() {
    const [language, setLanguage] = useState<Language>("en")
    const [clues, setClues] = useState<string[]>([])
    const [selectedClue, setSelectedClue] = useState("")
    const [liveClue, setLiveClue] = useState("")
    const [history, setHistory] = useState<string[]>([])

    useEffect(() => {
        const langClues = cluesData[language] || []
        setClues(langClues)
        setSelectedClue("")
    }, [language])

    const handleSend = () => {
        const trimmed = selectedClue.trim()
        if (trimmed) {
            setLiveClue(trimmed)
            setHistory(prev => [trimmed, ...prev.slice(0, 2)])
            console.log(`Sent clue in ${language}:`, trimmed)
        }
    }

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
                    <CardTitle>CLUES MANAGER</CardTitle>
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


                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <History className="w-4 h-4" />
                        History - Last 3 clues sent
                    </Label>
                    <div className={`min-h-[50px] border ${history.length > 0 ? "rounded-md p-2" : "bg-muted rounded-md p-2"}`}>
                        <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                            {history.map((item, idx) => (
                                <li key={idx} className="text-foreground color-gray-300 font-medium">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </CardContent>

            <CardFooter className="flex gap-4">
                <Button className=" cursor-pointer flex-1" onClick={handleSend} disabled={!selectedClue.trim()}>
                    Send
                </Button>
                <Button variant="outline" className=" cursor-pointer flex-1 bg-gray-300" onClick={handleClear} disabled={!liveClue}>
                    Clear
                </Button>
            </CardFooter>
        </Card>
    )
}
