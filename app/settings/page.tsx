import { SettingsContent } from "@/components/settings-content";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
    return (
        <div className="my-4 max-w-7xl mx-auto">
            <div className="flex">
                <Card className="w-full flex-[12] min-h-[500px]">
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <SettingsContent />
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
