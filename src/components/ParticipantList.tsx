'use client'

import { User } from '@/hooks/useUser'

interface Participant {
  id: string
  name: string
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isSpeaking?: boolean
}

interface ParticipantListProps {
  participants: Participant[]
  currentUser: User | null
  isOpen: boolean
  onClose: () => void
}

export default function ParticipantList({
  participants,
  currentUser,
  isOpen,
  onClose,
}: ParticipantListProps) {
  if (!isOpen) return null

  const allParticipants = currentUser
    ? [
        { ...currentUser, isAudioEnabled: true, isVideoEnabled: true, isLocal: true },
        ...participants,
      ]
    : participants

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700 flex flex-col z-40 shadow-2xl">
      <div className="p-3 sm:p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold">Participants ({allParticipants.length})</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-700 transition-colors"
          title="Close participants"
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

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
        {allParticipants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-700 rounded-lg"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
              {participant.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate text-sm sm:text-base">
                  {participant.name}
                  {(participant as any).isLocal && (
                    <span className="text-xs text-gray-400 ml-2">(You)</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 mt-1">
                <div className="flex items-center gap-1 text-xs">
                  {participant.isAudioEnabled ? (
                    <span className="text-green-400">●</span>
                  ) : (
                    <span className="text-red-400">●</span>
                  )}
                  <span className="text-gray-400">Audio</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {participant.isVideoEnabled ? (
                    <span className="text-green-400">●</span>
                  ) : (
                    <span className="text-red-400">●</span>
                  )}
                  <span className="text-gray-400">Video</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
