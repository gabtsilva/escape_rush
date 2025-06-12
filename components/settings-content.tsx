"use client"

import * as React from "react"
import { SettingsToggleOption } from "./secure-reset-option";
import { CardContent } from "./ui/card";
import { useAppState } from "./state-provider";

export function SettingsContent() {
    const { secureReset, setSecureReset, clueHistory, setClueHistory } = useAppState();


    return <CardContent className="space-y-4 mt-4">
        <SettingsToggleOption title="Secure Timer Reset" description="Turn this on/off to enable/disable confirmation before complete timer reset." currentValue={secureReset} setCurrentValue={setSecureReset} />
        <SettingsToggleOption title="Clue history" description="Turn this on/off to enable/disable to show the clue history feature." currentValue={clueHistory} setCurrentValue={setClueHistory} />
    </CardContent>
}
