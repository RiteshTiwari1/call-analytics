import { useState, useEffect } from 'react'

interface EditDataModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: number[]) => void
  currentData: number[]
  previousData?: number[] | null
  showOverwriteWarning: boolean
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function EditDataModal({
  isOpen,
  onClose,
  onSave,
  currentData,
  previousData,
  showOverwriteWarning,
}: EditDataModalProps) {
  const [values, setValues] = useState<number[]>(currentData)
  const [confirmed, setConfirmed] = useState(!showOverwriteWarning)

  useEffect(() => {
    setValues(currentData)
    setConfirmed(!showOverwriteWarning)
  }, [currentData, showOverwriteWarning])

  if (!isOpen) return null

  const handleChange = (index: number, value: string) => {
    const newValues = [...values]
    newValues[index] = parseInt(value) || 0
    setValues(newValues)
  }

  const handleSave = () => {
    onSave(values)
    onClose()
  }

  const totalCalls = values.reduce((a, b) => a + b, 0)

  // Overwrite Warning Modal
  if (showOverwriteWarning && !confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

        <div className="relative w-full max-w-md">
          <div
            className="rounded-3xl shadow-2xl"
            style={{
              backgroundColor: '#1a1a2e',
              border: '1px solid #374151',
              padding: '48px 40px',
            }}
          >
            {/* Warning Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg style={{ width: '44px', height: '44px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '12px' }}>
              Data Already Exists
            </h2>
            <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: '16px', marginBottom: '32px' }}>
              You have previously saved data. Would you like to overwrite it?
            </p>

            {/* Previous data display */}
            <div
              style={{
                backgroundColor: '#0d0d1a',
                border: '2px solid #4b5563',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '32px',
              }}
            >
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '16px', fontWeight: '600' }}>Your previous values:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {previousData?.map((val, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', fontWeight: '500' }}>{DAYS[i]}</div>
                    <div
                      style={{
                        padding: '12px 8px',
                        backgroundColor: '#1a1a2e',
                        border: '1px solid #4b5563',
                        borderRadius: '10px',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
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
                onClick={() => setConfirmed(true)}
                style={{
                  flex: 1,
                  padding: '18px 24px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)',
                }}
              >
                Yes, Overwrite
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Edit Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-xl" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div
          className="rounded-3xl shadow-2xl"
          style={{
            backgroundColor: '#1a1a2e',
            border: '1px solid #374151',
            padding: '40px',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                Edit Call Volume
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '16px' }}>
                Customize your daily call data
              </p>
            </div>
            <div
              style={{
                textAlign: 'right',
                backgroundColor: '#0d0d1a',
                border: '2px solid #4b5563',
                borderRadius: '14px',
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Total</div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {totalCalls}
              </div>
            </div>
          </div>

          {/* Input Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {DAYS.map((day, index) => (
              <div
                key={day}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  backgroundColor: '#0d0d1a',
                  border: '2px solid #4b5563',
                  borderRadius: '14px',
                }}
              >
                <div style={{ width: '100px' }}>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>{DAY_FULL[index]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={values[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    min="0"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#1a1a2e',
                      border: '2px solid #4b5563',
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '18px',
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
                  />
                </div>
                <div style={{ width: '80px', textAlign: 'right' }}>
                  {values[index] !== (previousData?.[index] ?? currentData[index]) && (
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        backgroundColor: values[index] > (previousData?.[index] ?? currentData[index])
                          ? 'rgba(34, 197, 94, 0.2)'
                          : 'rgba(239, 68, 68, 0.2)',
                        color: values[index] > (previousData?.[index] ?? currentData[index])
                          ? '#22c55e'
                          : '#ef4444',
                      }}
                    >
                      {values[index] > (previousData?.[index] ?? currentData[index]) ? '+' : ''}
                      {values[index] - (previousData?.[index] ?? currentData[index])}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
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
              onClick={handleSave}
              style={{
                flex: 1,
                padding: '18px 24px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(147, 51, 234, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
