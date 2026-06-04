'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.ok) {
      toast.success('Connexion réussie')
      router.push('/espace-vendeur')
    } else {
      toast.error('Identifiants invalides')
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="font-display font-bold text-dark-900">IV</span>
            </div>
            <span className="font-display font-semibold text-white text-xl">Immo Vision 17</span>
          </Link>
          <h1 className="font-display text-3xl font-semibold text-white">Connexion</h1>
          <p className="text-white/40 mt-2">Accédez à votre espace personnel</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/55 text-sm font-medium mb-1.5">
                <Mail className="inline w-3.5 h-3.5 mr-1" />Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                className="input-premium w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-white/55 text-sm font-medium mb-1.5">
                <Lock className="inline w-3.5 h-3.5 mr-1" />Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-premium w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? <span className="loader w-5 h-5" /> : <>
                Se connecter <ArrowRight className="w-4 h-4" />
              </>}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-transparent px-4 text-white/25 text-xs">ou</span>
            </div>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/espace-vendeur' })}
            className="btn-ghost w-full py-3 rounded-xl glass text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button>
        </div>

        <p className="text-center text-white/25 text-sm mt-6">
          Pas encore de compte ?{' '}
          <Link href="/contact" className="text-gold-400 hover:text-gold-300">Contactez-nous</Link>
        </p>
      </div>
    </div>
  )
}
