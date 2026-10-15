import { useMemo } from 'react'
import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = useMemo(() => {
    return [
      {
        label: 'At least 8 characters',
        met: password.length >= 8,
      },
      {
        label: 'Contains uppercase letter',
        met: /[A-Z]/.test(password),
      },
      {
        label: 'Contains lowercase letter',
        met: /[a-z]/.test(password),
      },
      {
        label: 'Contains number',
        met: /[0-9]/.test(password),
      },
      {
        label: 'Contains special character',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ]
  }, [password])

  const strength = useMemo(() => {
    const metCount = requirements.filter((req) => req.met).length
    if (metCount === 0) return { label: '', color: '', width: '0%' }
    if (metCount <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' }
    if (metCount <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' }
    return { label: 'Strong', color: 'bg-green-500', width: '100%' }
  }, [requirements])

  if (!password) return null

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Password strength</span>
          {strength.label && (
            <span
              className={`font-medium ${
                strength.label === 'Weak'
                  ? 'text-red-500'
                  : strength.label === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}
            >
              {strength.label}
            </span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full transition-all duration-300 ${strength.color}`}
            style={{ width: strength.width }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-1.5 rounded-md border border-border bg-accent/20 p-3">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="h-3.5 w-3.5 flex-shrink-0 text-green-500" />
            ) : (
              <X className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
            )}
            <span className={req.met ? 'text-foreground' : 'text-muted-foreground'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
