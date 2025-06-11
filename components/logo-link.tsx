"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from 'next/image'

export function LogoLink() {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    return (
        <Link href="/">
            <Image
                src={isDark ? "/logo-white.png" : "/logo-black.png"}
                alt="Escape Rush Logo"
                width={24}
                height={24}
            />
        </Link>)
}
