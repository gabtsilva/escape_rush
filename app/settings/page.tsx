import { SecureResetOption } from "@/components/secure-reset-option";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {

  return (
    <div className="my-4 max-w-7xl mx-auto">
      <div className="flex">
        <Card className="w-full flex-[12] min-h-[500px]">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <SecureResetOption />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
