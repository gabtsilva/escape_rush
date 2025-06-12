"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppState } from "@/components/state-provider";

export function SecureResetOption() {
    const { secureReset, setSecureReset } = useAppState();

    return (
        <div className="flex items-center space-x-4">
            <Switch
                id="secure-timer-reset"
                checked={secureReset}
                onCheckedChange={setSecureReset}
            />
            <div>
                <Label htmlFor="secure-timer-reset" className="text-base font-medium">
                    Secure Timer Reset
                </Label>
                <p className="text-sm text-muted-foreground">
                    Turn this on/off to enable/disable confirmation before complete timer reset.
                </p>
            </div>
        </div>)
}
