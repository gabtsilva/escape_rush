"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type SettingsToggleOptionProps = {
    title: string;
    description: string;
    currentValue: boolean;
    setCurrentValue: (val: boolean) => void;
}

export function SettingsToggleOption({ title, description, currentValue, setCurrentValue }: SettingsToggleOptionProps) {

    return (
        <div className="flex items-center space-x-4">
            <Switch
                className="cursor-pointer"
                checked={currentValue}
                onCheckedChange={setCurrentValue}
            />
            <div>
                <Label className="text-base font-medium">
                    {title}
                </Label>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>)
}
