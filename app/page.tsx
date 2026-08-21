import { FloatingStickers } from '@/components/floating-stickers'
import { ResumeDeck } from '@/components/resume-deck'

export default function Page() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12">
      <div aria-hidden className="deck-grid absolute inset-0" />
      <FloatingStickers />
      <ResumeDeck />
    </main>
  )
}
