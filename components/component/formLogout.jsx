"use client"
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { usePopupForm } from "@/hooks/usePopupForm"
import { signOutAdmin } from "@/lib/signOut"

export default function FormLogout() {

  const { isOpen, setIsOpen } = usePopupForm()

  const router = useRouter()

  const handleLogout = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken")
        const {error} = await signOutAdmin(accessToken)
        if (error) throw error
        setIsOpen({ logout: false })
        router.push("/")
        console.log("Logged out successfully.")
    } catch (error) {
        console.error("Logout Error:", error)
    }
  }

  console.log(isOpen)

  return (
    <div className="fixed flex items-center justify-center min-h-screen bg-background">
      <AlertDialog
        open={isOpen.logout}
        onOpenChange={(open) => setIsOpen({ logout: open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin ingin keluar?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan keluar dari akun, dan akan kembali ke halaman utama
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen({ logout: false })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
