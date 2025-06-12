"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, LightbulbOff } from "lucide-react"

export default function NotificationManager() {
    const [askedForClue, setAskedForClue] = useState<boolean>(false)

    return (
        <Card className="h-full flex flex-col">
            <CardContent className="flex-1 flex flex-col gap-4">
                <div className="flex-1">
                    {askedForClue ? (
                        <div className="h-full rounded-xl p-6 text-center text-white bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex flex-col items-center justify-center gap-4 shadow-2xl animate-pulse">
                            <Lightbulb className="h-16 w-16 drop-shadow-glow" />
                            Help requested!
                        </div>
                    ) : (
                        <div className="h-full rounded-xl p-6 text-center text-muted-foreground bg-muted flex flex-col items-center justify-center gap-4">
                            <LightbulbOff className="h-16 w-16 text-zinc-500" />
                            Waiting for help request...
                        </div>
                    )}
                </div>

                {/* Developer Buttons */}
                <div className="w-full">
                    <Button className="cursor-pointer w-full" variant="default">
                        Trigger Hacking video
                    </Button>
                </div>
                <div className="flex justify-center gap-4">
                    <Button className="cursor-pointer" variant="outline" onClick={() => setAskedForClue(true)}>
                        Trigger Help Request (dev)
                    </Button>
                    <Button className="cursor-pointer" variant="secondary" onClick={() => setAskedForClue(false)}>
                        Clear Help Request (dev)
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
