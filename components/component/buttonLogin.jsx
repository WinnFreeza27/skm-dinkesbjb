import { Button } from "@/components/ui/button"
import FormLogin from "./formLogin"
import { useState } from "react"
import { useSessionStore } from "@/hooks/useSessionStore"
import Link from "next/link"

export default function ButtonLogin() {
    const {isAuthenticated} = useSessionStore()
    console.log(isAuthenticated)
    const [isOpen, setIsOpen] = useState(false)
    const togglePopup = () => setIsOpen(!isOpen)
    return (
        <div className="flex flex-col items-center justify-center p-4">
            {!isAuthenticated ? (
                <>
                    <Button onClick={togglePopup}>Login</Button>
                    <FormLogin isOpen={isOpen} setIsOpen={setIsOpen} />
                </>
            ) : (
                <Link href="/responses" className="text-white">
                    <Button>Dashboard</Button>
                </Link>
            )}
        </div>
    )
}