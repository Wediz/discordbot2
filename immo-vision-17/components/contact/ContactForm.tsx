'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Objet requis'),
  message: z.string().min(20, 'Message trop court (20 caractères minimum)'),
})

type FormData = z.infer<typeof schema>

const SUBJECTS = [
  'Je souhaite vendre mon bien',
  'Je recherche un bien à acheter',
  'Estimation gratuite',
  'Question sur un bien',
  'Partenariat',
  'Autre',
]

export function ContactForm() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setDone(true)
      toast.success('Message envoyé !')
    } catch {
      toast.error('Une erreur est survenue.')
    }
  }

  if (done) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-5 shadow-gold">
          <Check className="w-8 h-8 text-dark-900" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-white mb-3">Message envoyé !</h3>
        <p className="text-white/50">Je vous recontacte dans les plus brefs délais.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-white/55 text-sm font-medium mb-1.5">Nom complet</label>
          <input {...register('name')} placeholder="Jean Dupont" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-white/55 text-sm font-medium mb-1.5">Téléphone</label>
          <input {...register('phone')} type="tel" placeholder="06 12 34 56 78" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-white/55 text-sm font-medium mb-1.5">Email</label>
        <input {...register('email')} type="email" placeholder="jean@email.fr" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-white/55 text-sm font-medium mb-1.5">Objet</label>
        <select {...register('subject')} className="input-premium w-full px-4 py-3 rounded-xl text-sm">
          <option value="">Sélectionner un objet</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-white/55 text-sm font-medium mb-1.5">Message</label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Bonjour, je souhaite..."
          className="input-premium w-full px-4 py-3 rounded-xl text-sm resize-none"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <><span className="loader w-4 h-4" /> Envoi…</>
        ) : (
          <><Send className="w-4 h-4" /> Envoyer le message</>
        )}
      </button>
    </form>
  )
}
