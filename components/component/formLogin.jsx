import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, X } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { encryptData } from '@/utils/encrypt'
import { decryptData } from '@/utils/decrypt'

export default function FormLogin({ isOpen, setIsOpen }) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState('')
  const popupRef = useRef(null)

  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Tolong masukkan email yang valid')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || emailError) {
      setEmailError('Tolong masukkan email yang valid')
      return
    }
    setStatus('loading')
    
    try {
      const encryptedData = await encryptData(JSON.stringify({email, password}))
      const decryptedData = await decryptData(encryptedData)
      console.log(encryptedData)
      console.log(decryptedData)
      // const user = await axios.post('/api/auth', {encryptData: encryptedUser});
      console.log(user)
      if (user.status === 200) {
        setIsOpen(false)
        setStatus('success')
        router.push('/responses')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-bgprimary to-bgsecondary p-4">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
        <div ref={popupRef} className="relative w-full max-w-md">
            <Card>
              <Button
                className="absolute right-2 top-2 p-1"
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1 pt-6">
                  <CardTitle className="text-2xl font-bold text-center">Login Admin</CardTitle>
                  <CardDescription className="text-center">
                    Masukkan email dan password sebagai admin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="m@example.com" 
                      required 
                      value={email}
                      onChange={handleEmailChange}
                      aria-invalid={emailError ? "true" : "false"}
                      aria-describedby="email-error"
                    />
                    {emailError && (
                      <p id="email-error" className="text-sm text-destructive mt-1">
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={handlePasswordChange}
                        required 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Loading...' : 'Login'}</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}