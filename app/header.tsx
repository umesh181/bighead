import { ModeToggle } from "@/components/ui/mode-toggle"
import Image from "next/image"
import Link from "next/link"
import { HeaderActions } from "./header-actions"

export function Header(){
    return <div className="bg-slate-900 py-3">
        <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 text-2xl">
            <Image src="/brain.png" width={50} height={50} alt={"logo"} />
            BigHead
        </Link>

        <div className="flex gap-6 items-center">
        <ModeToggle/>
        <HeaderActions/>
        </div>
        
      </div>
    </div>
}