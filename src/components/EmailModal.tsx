import { useState } from 'react'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}

export default function EmailModal({ isOpen, onClose, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && email.includes('@')) {
      onSubmit(email.trim())
    }
  }

  const isValidEmail = email.includes('@') && email.includes('.')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <div
          className="rounded-3xl shadow-2xl"
          style={{
            backgroundColor: '#1a1a2e',
            border: '1px solid #374151',
            padding: '48px 40px',
          }}
        >
          {/* Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg style={{ width: '44px', height: '44px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '12px' }}>
            Welcome Back
          </h2>
          <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: '16px', marginBottom: '40px' }}>
            Enter your email to save and sync your chart data
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#d1d5db', marginBottom: '12px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  borderRadius: '14px',
                  backgroundColor: '#0d0d1a',
                  border: '2px solid #4b5563',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a855f7'
                  e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#4b5563'
                  e.target.style.boxShadow = 'none'
                }}
                autoFocus
              />
              {email && !isValidEmail && (
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#f87171' }}>Please enter a valid email address</p>
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '18px 24px',
                  borderRadius: '14px',
                  backgroundColor: '#0d0d1a',
                  border: '2px solid #4b5563',
                  color: '#d1d5db',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValidEmail}
                style={{
                  flex: 1,
                  padding: '18px 24px',
                  borderRadius: '14px',
                  background: isValidEmail
                    ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                    : '#4b5563',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isValidEmail ? 'pointer' : 'not-allowed',
                  boxShadow: isValidEmail
                    ? '0 10px 30px rgba(147, 51, 234, 0.4)'
                    : 'none',
                }}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
