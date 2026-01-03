import { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<any>
  error?: string
}

export default function AntiBotChallenge({ register, error }: Props) {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  useEffect(() => {
    setA(Math.floor(Math.random() * 10) + 1)
    setB(Math.floor(Math.random() * 10) + 1)
  }, [])

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-300">
        Solve: {a} + {b} = ?
      </label>
      <input
        {...register('antiBot', {
          validate: v => Number(v) === a + b || 'Wrong answer',
        })}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
