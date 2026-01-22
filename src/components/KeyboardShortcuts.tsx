'use client'

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
  theme: 'dark' | 'light'
}

const shortcuts = [
  { key: 'M', description: 'Toggle mute/unmute microphone' },
  { key: 'V', description: 'Toggle camera on/off' },
  { key: 'S', description: 'Toggle screen sharing' },
  { key: 'C', description: 'Toggle chat' },
  { key: 'F', description: 'Toggle fullscreen' },
  { key: 'Esc', description: 'Leave room (or exit fullscreen)' },
]

export default function KeyboardShortcuts({ isOpen, onClose, theme }: KeyboardShortcutsProps) {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} px-4 sm:px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} flex items-center justify-between`}>
          <h2 className="text-lg sm:text-xl font-semibold">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded transition-colors ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
            title="Close shortcuts"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-4 sm:p-6">
          <div className="space-y-3">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <span className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {shortcut.description}
                </span>
                <kbd className={`px-3 py-1.5 rounded font-mono text-xs sm:text-sm font-semibold ${
                  theme === 'dark'
                    ? 'bg-gray-900 text-blue-400 border border-gray-600'
                    : 'bg-gray-100 text-blue-600 border border-gray-300'
                }`}>
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-xs sm:text-sm text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Press any shortcut key to use it
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
