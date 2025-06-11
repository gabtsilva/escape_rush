"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button className="cursor-pointer" variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun /> : <Moon />}</Button>
    )
}
