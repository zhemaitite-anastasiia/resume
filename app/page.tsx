import { FloatingStickers } from '@/components/floating-stickers'
import { ResumeDeck } from '@/components/resume-deck'
import { ContactModal } from '@/components/contact-modal'

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip px-4">
      <div aria-hidden className="deck-grid absolute inset-0" />
      <FloatingStickers />
      <ResumeDeck />
      <ContactModal />

      <footer className="relative z-10 mt-auto pb-8 pt-[21rem] text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Anastasiia Zhemaitite
      </footer>
    </main>
  )
}
