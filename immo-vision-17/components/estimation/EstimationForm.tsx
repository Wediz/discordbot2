'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, MapPin, Home, Ruler, Star,
  Calendar, User, Phone, Mail, ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'

const STEPS = [
  { id: 1, title: 'Votre bien', icon: Home },
  { id: 2, title: 'Détails', icon: Ruler },
  { id: 3, title: 'État & Projet', icon: Star },
  { id: 4, title: 'Coordonnées', icon: User },
]

const schema = z.object({
  // Step 1
  type: z.enum(['MAISON', 'APPARTEMENT', 'TERRAIN', 'VILLA', 'AUTRE']),
  address: z.string().min(5, 'Adresse requise'),
  city: z.string().min(2, 'Ville requise'),
  zipCode: z.string().optional(),
  // Step 2
  surface: z.number({ invalid_type_error: 'Requis' }).min(1, 'Surface requise'),
  terrain: z.number().optional(),
  rooms: z.number({ invalid_type_error: 'Requis' }).min(1),
  bedrooms: z.number().min(0),
  yearBuilt: z.number().optional(),
  hasGarden: z.boolean().optional(),
  hasPool: z.boolean().optional(),
  hasGarage: z.boolean().optional(),
  // Step 3
  condition: z.enum(['NEUF', 'BON_ETAT', 'A_RAFRAICHIR', 'A_RENOVER']),
  project: z.enum(['URGENT', 'DANS_3_MOIS', 'DANS_6_MOIS', 'PLUS_DE_6_MOIS', 'REFLEXION']),
  // Step 4
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Téléphone requis'),
})

type FormData = z.infer<typeof schema>

export function EstimationForm() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hasGarden: false, hasPool: false, hasGarage: false },
  })

  const type = watch('type')
  const condition = watch('condition')
  const project = watch('project')
  const hasGarden = watch('hasGarden')
  const hasPool = watch('hasPool')
  const hasGarage = watch('hasGarage')

  const STEP_FIELDS: Record<number, (keyof FormData)[]> = {
    1: ['type', 'address', 'city'],
    2: ['surface', 'rooms', 'bedrooms'],
    3: ['condition', 'project'],
    4: ['firstName', 'lastName', 'email', 'phone'],
  }

  const nextStep = async () => {
    const valid = await trigger(STEP_FIELDS[step] as any)
    if (valid) setStep((s) => Math.min(s + 1, 4))
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6 shadow-gold"
        >
          <Check className="w-10 h-10 text-dark-900" />
        </motion.div>
        <h2 className="font-display text-3xl font-semibold text-white mb-4">Demande envoyée !</h2>
        <p className="text-white/55 text-lg mb-6 max-w-sm mx-auto">
          Merci. Votre estimation personnalisée sera étudiée et je vous recontacte sous 24h.
        </p>
        <div className="glass-gold rounded-2xl p-5 max-w-xs mx-auto space-y-2">
          {['✓ Dossier en cours d’analyse', '✓ Estimation sous 24h', '✓ Appel personnalisé avec votre conseiller'].map((line) => (
            <p key={line} className="text-gold-400/80 text-sm">{line}</p>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const active = step === s.id
            const done = step > s.id
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    done ? 'bg-gradient-gold shadow-gold' :
                    active ? 'border-2 border-gold-500 bg-gold-500/10' :
                    'border border-white/10 bg-white/3'
                  }`}>
                    {done
                      ? <Check className="w-5 h-5 text-dark-900" />
                      : <Icon className={`w-4 h-4 ${ active ? 'text-gold-400' : 'text-white/25' }`} />}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium transition-colors ${
                    active ? 'text-gold-400' : done ? 'text-white/50' : 'text-white/25'
                  }`}>{s.title}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px flex-1 mx-2 transition-all duration-500 mb-5 ${ done ? 'bg-gold-500' : 'bg-white/10' }`} style={{ minWidth: 24 }} />
                )}
              </div>
            )
          })}
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full progress-bar rounded-full"
            animate={{ width: `${((step - 1) / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">

          {/* ---- STEP 1 ---- */}
          {step === 1 && (
            <motion.div key="s1"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.28 }} className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Quel type de bien ?</h3>
                <p className="text-white/35 text-sm">Sélectionnez le type de votre bien</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { v: 'MAISON', l: 'Maison', e: '🏠' },
                  { v: 'APPARTEMENT', l: 'Appartement', e: '🏢' },
                  { v: 'TERRAIN', l: 'Terrain', e: '🌿' },
                  { v: 'VILLA', l: 'Villa', e: '🏡' },
                  { v: 'AUTRE', l: 'Autre', e: '🏗️' },
                ].map(({ v, l, e }) => (
                  <button key={v} type="button" onClick={() => setValue('type', v as any)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                      type === v
                        ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                        : 'border-white/10 text-white/50 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl">{e}</span>
                    <span className="text-sm font-medium">{l}</span>
                  </button>
                ))}
              </div>
              {errors.type && <p className="text-red-400 text-xs">{errors.type.message}</p>}

              <div className="space-y-3">
                <div>
                  <label className="block text-white/55 text-sm font-medium mb-1.5">
                    <MapPin className="inline w-3.5 h-3.5 mr-1" />Adresse du bien
                  </label>
                  <input {...register('address')} placeholder="12 rue des Fleurs" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/55 text-sm font-medium mb-1.5">Ville</label>
                    <input {...register('city')} placeholder="Royan" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white/55 text-sm font-medium mb-1.5">Code postal</label>
                    <input {...register('zipCode')} placeholder="17200" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <motion.div key="s2"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.28 }} className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Caractéristiques</h3>
                <p className="text-white/35 text-sm">Plus vous êtes précis, plus l’estimation est juste</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'surface' as const, label: 'Surface (m²)', placeholder: '120' },
                  { name: 'terrain' as const, label: 'Terrain (m²)', placeholder: '500' },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-white/55 text-sm font-medium mb-1.5">{label}</label>
                    <input
                      {...register(name, { valueAsNumber: true })}
                      type="number" placeholder={placeholder}
                      className="input-premium w-full px-4 py-3 rounded-xl text-sm"
                    />
                    {errors[name] && <p className="text-red-400 text-xs mt-1">{(errors[name] as any)?.message}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-white/55 text-sm font-medium mb-1.5">Pièces</label>
                  <select {...register('rooms', { valueAsNumber: true })} className="input-premium w-full px-4 py-3 rounded-xl text-sm">
                    <option value="">Sélectionner</option>
                    {[1,2,3,4,5,6,7,8,9].map((n) => <option key={n} value={n}>{n} pièce{n>1?'s':''}</option>)}
                    <option value="10">10+</option>
                  </select>
                  {errors.rooms && <p className="text-red-400 text-xs mt-1">{errors.rooms.message}</p>}
                </div>
                <div>
                  <label className="block text-white/55 text-sm font-medium mb-1.5">Chambres</label>
                  <select {...register('bedrooms', { valueAsNumber: true })} className="input-premium w-full px-4 py-3 rounded-xl text-sm">
                    {[0,1,2,3,4,5,6,7].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-white/55 text-sm font-medium mb-1.5">
                    <Calendar className="inline w-3.5 h-3.5 mr-1" />Année de construction
                  </label>
                  <input
                    {...register('yearBuilt', { valueAsNumber: true })}
                    type="number" placeholder="1985" min="1800" max="2025"
                    className="input-premium w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/55 text-sm font-medium mb-3">Options</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'hasGarden' as const, label: 'Jardin', emoji: '🌳', val: hasGarden },
                    { name: 'hasPool' as const, label: 'Piscine', emoji: '🏊', val: hasPool },
                    { name: 'hasGarage' as const, label: 'Garage', emoji: '🚗', val: hasGarage },
                  ].map(({ name, label, emoji, val }) => (
                    <button key={name} type="button" onClick={() => setValue(name, !val)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                        val ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-white/10 text-white/45 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl">{emoji}</span>
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ---- STEP 3 ---- */}
          {step === 3 && (
            <motion.div key="s3"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.28 }} className="space-y-7"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">État & Projet de vente</h3>
                <p className="text-white/35 text-sm">Affinez votre estimation</p>
              </div>

              <div>
                <label className="block text-white/55 text-sm font-medium mb-3">État général</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: 'NEUF', l: 'Neuf / Récent', d: 'Moins de 5 ans' },
                    { v: 'BON_ETAT', l: 'Bon état', d: 'Entretenu' },
                    { v: 'A_RAFRAICHIR', l: 'À rafraîchir', d: 'Petits travaux' },
                    { v: 'A_RENOVER', l: 'À rénover', d: 'Travaux importants' },
                  ].map(({ v, l, d }) => (
                    <button key={v} type="button" onClick={() => setValue('condition', v as any)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                        condition === v ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <p className="font-medium text-white text-sm">{l}</p>
                      <p className="text-white/35 text-xs mt-0.5">{d}</p>
                    </button>
                  ))}
                </div>
                {errors.condition && <p className="text-red-400 text-xs mt-2">{errors.condition.message}</p>}
              </div>

              <div>
                <label className="block text-white/55 text-sm font-medium mb-3">
                  <Calendar className="inline w-3.5 h-3.5 mr-1" />Projet de vente
                </label>
                <div className="space-y-2">
                  {[
                    { v: 'URGENT', l: 'Vente urgente', d: 'Dès que possible' },
                    { v: 'DANS_3_MOIS', l: 'Dans 3 mois', d: 'Court terme' },
                    { v: 'DANS_6_MOIS', l: 'Dans 6 mois', d: 'Moyen terme' },
                    { v: 'PLUS_DE_6_MOIS', l: 'Plus de 6 mois', d: 'Long terme' },
                    { v: 'REFLEXION', l: 'En réflexion', d: 'Simple estimation' },
                  ].map(({ v, l, d }) => (
                    <button key={v} type="button" onClick={() => setValue('project', v as any)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                        project === v ? 'border-gold-500 bg-gold-500/8 text-gold-400' : 'border-white/10 text-white/55 hover:border-white/20'
                      }`}
                    >
                      <span className="font-medium text-sm">{l}</span>
                      <span className="text-xs opacity-60">{d}</span>
                    </button>
                  ))}
                </div>
                {errors.project && <p className="text-red-400 text-xs mt-2">{errors.project.message}</p>}
              </div>
            </motion.div>
          )}

          {/* ---- STEP 4 ---- */}
          {step === 4 && (
            <motion.div key="s4"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.28 }} className="space-y-5"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Vos coordonnées</h3>
                <p className="text-white/35 text-sm">Pour recevoir votre estimation sous 24h</p>
              </div>

              <div className="glass-gold rounded-xl px-4 py-3 text-gold-400/75 text-sm">
                🔒 Vos données sont sécurisées et ne seront jamais partagées.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/55 text-sm font-medium mb-1.5">Prénom</label>
                  <input {...register('firstName')} placeholder="Jean" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-white/55 text-sm font-medium mb-1.5">Nom</label>
                  <input {...register('lastName')} placeholder="Dupont" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-white/55 text-sm font-medium mb-1.5">
                  <Phone className="inline w-3.5 h-3.5 mr-1" />Téléphone
                </label>
                <input {...register('phone')} type="tel" placeholder="06 12 34 56 78" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-white/55 text-sm font-medium mb-1.5">
                  <Mail className="inline w-3.5 h-3.5 mr-1" />Email
                </label>
                <input {...register('email')} type="email" placeholder="jean.dupont@email.fr" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <p className="text-white/25 text-xs">
                En soumettant ce formulaire, vous acceptez d’être recontacté par Immo Vision 17.
                Vous pouvez vous désinscrire à tout moment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'btn-outline'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Précédent
          </button>

          {step < 4 ? (
            <button type="button" onClick={nextStep} className="btn-gold flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold">
              Suivant <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="btn-gold flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold disabled:opacity-50">
              {submitting ? (
                <><span className="loader w-4 h-4" /> Envoi en cours…</>
              ) : (
                <>Recevoir mon estimation <Check className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
