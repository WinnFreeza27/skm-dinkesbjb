import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useSessionStore } from "@/hooks/useSessionStore"
import { usePopupForm } from "@/hooks/usePopupForm"
import { useRef, useEffect } from "react"

export default function ButtonLogin() {
    const { isAuthenticated } = useSessionStore()
    const { isOpen, setIsOpen } = usePopupForm()
    const btnRef = useRef(null)


    const formPopup = () => {
        setIsOpen({login: !isOpen.login})
        console.log(isOpen)
    }

    const logoutPopup = () => {
        setIsOpen({logout: !isOpen.logout})
        console.log(isOpen)
    }
    return (
        <div>
            {!isAuthenticated ? (
                <>
                    <Button ref={btnRef} onClick={formPopup} variant="ghost" className="w-full justify-start">
                        <LogIn className="mr-2 h-4 w-4" />Login
                    </Button>
                </>
            ) : (
                <Button onClick={logoutPopup} variant="ghost" className="w-full justify-start">
                        <LogIn className="mr-2 h-4 w-4" />Logout
                </Button>
            )}
        </div>
    )
}
