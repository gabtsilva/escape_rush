import ClueManager from "@/components/clues-manager"
import CountdownTimer from "@/components/countdown-timer"
import NotificationManager from "@/components/notification-manager"

export default function Home() {
  return <div className="my-4 max-w-7xl mx-auto">
    <div className="flex gap-4 justify-between mb-4 min-h-[200px] items-stretch">
      <div className="flex-[8]">
        <CountdownTimer />
      </div>
      <div className="flex-[4]">
        <NotificationManager />
      </div>
    </div>
    <ClueManager />
  </div>
}