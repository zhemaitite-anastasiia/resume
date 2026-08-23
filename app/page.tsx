import { FloatingStickers } from '@/components/floating-stickers'
import { ResumeDeck } from '@/components/resume-deck'
import { ContactModal } from '@/components/contact-modal'

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-x-clip px-4 pb-24">
      <div aria-hidden className="deck-grid absolute inset-0" />
      <FloatingStickers />
      <ResumeDeck />
      <ContactModal />
    </main>
  )
}
