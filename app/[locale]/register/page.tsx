'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validations'
import { supabase } from '@/lib/supabase'
import { phoneToEmail } from '@/lib/utils'
import toast from 'react-hot-toast'
import AuthCard from '@/components/AuthCard'
import PasswordField from '@/components/PasswordField'
import AntiBotChallenge from '@/components/AntiBotChallenge'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslations } from 'next-intl'

type Form = {
  phone: string
  password: string
  confirm: string
  antiBot: string
}

export default function RegisterPage() {
  const t = useTranslations('register')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: Form) => {
    const email = phoneToEmail(data.phone)
    const { error } = await supabase.auth.signUp({ email, password: data.password })
    if (error) {
      toast.error(t('exists'))
      return
    }
    toast.success(t('success'))
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-emerald-900/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
          <LanguageSwitcher />
        </div>
        <AuthCard>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">{t('phone')}</label>
              <input
                {...register('phone')}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.phone && <span className="text-xs text-red-400">{errors.phone.message}</span>}
            </div>

            <PasswordField label={t('password')} name="password" register={register} error={errors.password?.message} />
            <PasswordField label={t('confirm')} name="confirm" register={register} error={errors.confirm?.message} />

            <AntiBotChallenge register={register} error={errors.antiBot?.message} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold rounded-lg py-2 transition"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </form>
        </AuthCard>
      </div>
    </main>
  )
}
