import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts'
import Header from './components/Header'
import ChartCard from './components/ChartCard'
import EmailModal from './components/EmailModal'
import EditDataModal from './components/EditDataModal'
import { callDuration, callOutcome, hourlyDistribution, DEFAULT_CALL_VOLUME } from './data/dummyData'
import { getUserChartData, saveUserChartData } from './lib/supabase'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function App() {
  const [callVolumeData, setCallVolumeData] = useState(DEFAULT_CALL_VOLUME)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [previousData, setPreviousData] = useState<number[] | null>(null)
  const [showOverwriteWarning, setShowOverwriteWarning] = useState(false)

  const chartData = DAYS.map((day, index) => ({
    day,
    calls: callVolumeData[index],
  }))

  // Calculate Total Calls dynamically from editable data
  const totalCalls = callVolumeData.reduce((a, b) => a + b, 0)

  // Stats card data with icons - Total Calls is now dynamic
  const statsConfig = [
    {
      label: 'Total Calls',
      value: totalCalls.toString(),
      change: '+12.5%',
      isPositive: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Success Rate',
      value: '77.4%',
      change: '+3.2%',
      isPositive: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Avg Duration',
      value: '4.2m',
      change: '-0.3m',
      isPositive: false,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Active Agents',
      value: '8',
      change: '+2',
      isPositive: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-500',
    },
  ]

  const handleEditClick = () => {
    if (!userEmail) {
      setShowEmailModal(true)
    } else {
      setShowEditModal(true)
    }
  }

  const handleEmailSubmit = async (email: string) => {
    setUserEmail(email)
    setShowEmailModal(false)

    // Check if user has existing data
    const existingData = await getUserChartData(email)
    if (existingData && existingData.chart_data?.callVolume) {
      setPreviousData(existingData.chart_data.callVolume)
      setCallVolumeData(existingData.chart_data.callVolume)
      setShowOverwriteWarning(true)
    } else {
      setShowOverwriteWarning(false)
    }
    setShowEditModal(true)
  }

  const handleSaveData = async (newData: number[]) => {
    setCallVolumeData(newData)
    if (userEmail) {
      await saveUserChartData(userEmail, { callVolume: newData })
      setPreviousData(newData)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
            <p className="text-gray-400">Real-time analytics for your voice agents</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsConfig.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-gray-800/50 hover:border-gray-700/50 p-5 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {stat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      stat.isPositive
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {stat.isPositive ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      )}
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Daily Call Volume - Editable */}
            <ChartCard title="Daily Call Volume" onEdit={handleEditClick}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                    itemStyle={{ color: '#a78bfa' }}
                  />
                  <Bar dataKey="calls" fill="url(#purpleGradient)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Call Outcome */}
            <ChartCard title="Call Outcome">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={callOutcome}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                    strokeWidth={0}
                  >
                    {callOutcome.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Call Duration Distribution */}
            <ChartCard title="Call Duration Distribution">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={callDuration}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                    itemStyle={{ color: '#22c55e' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="url(#greenGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 0, r: 4 }}
                    activeDot={{ fill: '#22c55e', strokeWidth: 0, r: 6 }}
                  />
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Hourly Distribution */}
            <ChartCard title="Calls by Hour">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={hourlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                    itemStyle={{ color: '#f59e0b' }}
                  />
                  <defs>
                    <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="calls"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#amberGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Footer */}
          {userEmail && (
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Signed in as <span className="text-purple-400">{userEmail}</span>
            </div>
          )}
        </main>
      </div>

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
      />

      <EditDataModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveData}
        currentData={callVolumeData}
        previousData={previousData}
        showOverwriteWarning={showOverwriteWarning}
      />
    </div>
  )
}

export default App
