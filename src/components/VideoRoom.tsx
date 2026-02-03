'use client'

import { useState, useEffect } from 'react'
import { useMediaStream } from '@/hooks/useMediaStream'
import { useAudioLevel } from '@/hooks/useAudioLevel'
import { useDevices } from '@/hooks/useDevices'
import { useRoomId } from '@/hooks/useRoomId'
import { useUser } from '@/hooks/useUser'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { useFullscreen } from '@/hooks/useFullscreen'
import { useVideoEffects } from '@/hooks/useVideoEffects'
import VideoPlayer from './VideoPlayer'
import DeviceSelector from './DeviceSelector'
import Chat from './Chat'
import ShareLink from './ShareLink'
import ShareButton from './ShareButton'
import UserSettings from './UserSettings'
import ParticipantList from './ParticipantList'
import ToastContainer from './ToastContainer'
import VideoEffectsPanel from './VideoEffectsPanel'
import Tooltip from './Tooltip'
import KeyboardShortcuts from './KeyboardShortcuts'
import { useLanguage } from '@/contexts/LanguageContext'

interface VideoRoomProps {
  userData?: {
    name: string
    email: string
    ageGroup: string
    goal: string
  }
}

export default function VideoRoom({ userData }: VideoRoomProps = {}) {
  const {
    stream,
    screenStream,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    selectedCameraId,
    selectedMicrophoneId,
    error,
    startStream,
    stopStream,
    toggleVideo,
    toggleAudio,
    switchCamera,
    switchMicrophone,
    toggleScreenShare,
  } = useMediaStream()

  const { cameras, microphones } = useDevices()
  const { audioLevel, isSpeaking } = useAudioLevel(stream)
  const { roomId, shareLink } = useRoomId()
  const { user, updateUserName } = useUser()
  const { theme, toggleTheme } = useTheme()
  const { toasts, showToast, removeToast } = useToast()
  const { isFullscreen, toggleFullscreen } = useFullscreen()
  const { effects, setBackground, setFilter } = useVideoEffects()
  const { t } = useLanguage()
  const [isJoined, setIsJoined] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [isEffectsOpen, setIsEffectsOpen] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize user name from userData if available
  useEffect(() => {
    if (userData?.name && user && user.name !== userData.name) {
      updateUserName(userData.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.name, user?.name])

  // Keyboard shortcuts
  useEffect(() => {
    if (!isJoined) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Mute/unmute audio: M
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        toggleAudio()
        showToast(
          isAudioEnabled ? 'Microphone muted' : 'Microphone unmuted',
          'info'
        )
      }

      // Toggle video: V
      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault()
        toggleVideo()
        showToast(
          isVideoEnabled ? 'Camera off' : 'Camera on',
          'info'
        )
      }

      // Toggle screen share: S
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault()
        toggleScreenShare()
      }

      // Toggle chat: C
      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        setIsChatOpen((prev) => !prev)
      }

      // Toggle fullscreen: F
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      }

      // Leave call: Escape
      if (e.key === 'Escape') {
        if (isShortcutsOpen) {
          setIsShortcutsOpen(false)
        } else if (isFullscreen) {
          toggleFullscreen()
        } else {
          handleLeave()
        }
      }

      // Show shortcuts: ?
      if (e.key === '?') {
        e.preventDefault()
        setIsShortcutsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isJoined,
    isAudioEnabled,
    isVideoEnabled,
    isFullscreen,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    toggleFullscreen,
    showToast,
    isShortcutsOpen,
  ])

  const handleJoin = async () => {
    setIsLoading(true)
    try {
      await startStream(selectedCameraId || undefined, selectedMicrophoneId || undefined)
      setIsJoined(true)
      showToast(t('videoroom.joined'), 'success')
    } catch (err) {
      showToast('Failed to join room', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLeave = () => {
    stopStream()
    setIsJoined(false)
    showToast(t('videoroom.left'), 'info')
  }

  const handleCopyLink = () => {
    showToast('Share link copied!', 'success')
  }

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      {user && (
        <UserSettings
          user={user}
          onUpdateName={updateUserName}
          isOpen={isUserSettingsOpen}
          onClose={() => setIsUserSettingsOpen(false)}
        />
      )}
      {!isJoined ? (
        <div className="flex items-center justify-center min-h-screen p-4 animate-fade-in">
          <div className="text-center max-w-md w-full">
            <div className="mb-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2">
                {t('videoroom.brand')}
              </div>
              <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('videoroom.title')}
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('videoroom.subtitle')}
              </p>
            </div>
            {roomId && (
              <div className="mb-6">
                <ShareLink shareLink={shareLink} roomId={roomId} />
              </div>
            )}
            <button
              onClick={handleJoin}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{t('videoroom.joining')}</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{t('videoroom.join')}</span>
                </>
              )}
            </button>
            {error && (
              <p className={`mt-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>Error: {error}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen relative">
          {/* Room Header */}
          <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'} border-b px-2 sm:px-4 py-2 ${(isChatOpen || isEffectsOpen) ? 'sm:mr-80' : ''}`}>
            <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0 flex-1">
                <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hidden sm:inline`}>{t('videoroom.room')}</span>
                <span className={`text-xs sm:text-sm font-mono ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} truncate`}>{roomId}</span>
                {user && (
                  <>
                    <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hidden sm:inline`}>•</span>
                    <button
                      onClick={() => setIsUserSettingsOpen(true)}
                      className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors truncate max-w-[100px] sm:max-w-none`}
                      title="Change your name"
                    >
                      {user.name}
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Tooltip content="Participants">
                  <button
                    onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                  >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  </button>
                </Tooltip>
                <Tooltip content="Toggle theme">
                  <button
                    onClick={toggleTheme}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                  >
                  {theme === 'dark' ? (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                  </button>
                </Tooltip>
                <div className="hidden sm:block">
                  <ShareButton shareLink={shareLink} />
                </div>
                <Tooltip content="Keyboard shortcuts (?)">
                  <button
                    onClick={() => setIsShortcutsOpen(true)}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Video Container */}
          <div className={`flex-1 p-1 sm:p-2 md:p-4 animate-fade-in ${(isChatOpen || isEffectsOpen) ? 'sm:mr-80' : ''}`}>
            <div className="max-w-4xl mx-auto h-full">
              <VideoPlayer stream={stream} screenStream={screenStream} isLocal muted effects={effects} />
            </div>
          </div>

          {/* Chat Sidebar */}
          <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

          {/* Participant List */}
          <ParticipantList
            participants={[
              {
                id: user?.id || 'local',
                name: user?.name || 'You',
                isAudioEnabled,
                isVideoEnabled,
                isSpeaking,
              },
            ]}
            currentUser={user}
            isOpen={isParticipantsOpen}
            onClose={() => setIsParticipantsOpen(false)}
          />

          {/* Video Effects Panel */}
          <VideoEffectsPanel
            background={effects.background}
            filter={effects.filter}
            onBackgroundChange={setBackground}
            onFilterChange={setFilter}
            isOpen={isEffectsOpen}
            onClose={() => setIsEffectsOpen(false)}
          />

          {/* Keyboard Shortcuts */}
          <KeyboardShortcuts
            isOpen={isShortcutsOpen}
            onClose={() => setIsShortcutsOpen(false)}
            theme={theme}
          />

          {/* Controls */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-2 sm:p-4 ${(isChatOpen || isEffectsOpen) ? 'sm:mr-80' : ''}`}>
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-1 sm:gap-2 md:gap-4 flex-wrap">
              {/* Microphone Selector */}
              {microphones.length > 1 && (
                <DeviceSelector
                  devices={microphones}
                  selectedDeviceId={selectedMicrophoneId}
                  onSelect={switchMicrophone}
                  label="Microphone"
                  icon={
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
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  }
                />
              )}

              <Tooltip content={isAudioEnabled ? (isSpeaking ? 'Speaking - Mute (M)' : 'Mute (M)') : 'Unmute (M)'}>
                <button
                  onClick={toggleAudio}
                  className={`p-2 sm:p-3 md:p-4 rounded-full transition-all relative ${
                    isAudioEnabled
                      ? isSpeaking
                        ? 'bg-green-600 hover:bg-green-700 ring-2 sm:ring-4 ring-green-500/50'
                        : 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                {isAudioEnabled ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                  </svg>
                )}
                {/* Audio level indicator on button */}
                {isAudioEnabled && isSpeaking && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-end gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-white rounded-full animate-pulse"
                          style={{
                            height: `${4 + audioLevel * 8 * (i + 1)}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                </button>
              </Tooltip>

              {/* Camera Selector */}
              {cameras.length > 1 && (
                <DeviceSelector
                  devices={cameras}
                  selectedDeviceId={selectedCameraId}
                  onSelect={switchCamera}
                  label="Camera"
                  icon={
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  }
                />
              )}

              <Tooltip content={isVideoEnabled ? 'Turn off camera (V)' : 'Turn on camera (V)'}>
                <button
                  onClick={toggleVideo}
                  className={`p-2 sm:p-3 md:p-4 rounded-full transition-colors ${
                    isVideoEnabled
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                {isVideoEnabled ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                )}
                </button>
              </Tooltip>

              <Tooltip content="Video effects">
                <button
                  onClick={() => setIsEffectsOpen(!isEffectsOpen)}
                  className={`p-2 sm:p-3 md:p-4 rounded-full transition-colors ${
                    isEffectsOpen
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                </button>
              </Tooltip>

              <Tooltip content={isScreenSharing ? 'Stop sharing (S)' : 'Share screen (S)'}>
                <button
                  onClick={toggleScreenShare}
                  className={`p-2 sm:p-3 md:p-4 rounded-full transition-colors ${
                    isScreenSharing
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                {isScreenSharing ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
                </button>
              </Tooltip>

              <Tooltip content={isFullscreen ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'}>
                <button
                  onClick={toggleFullscreen}
                  className={`p-2 sm:p-3 md:p-4 rounded-full transition-colors ${
                    isFullscreen
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                {isFullscreen ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                )}
                </button>
              </Tooltip>

              <Tooltip content={isChatOpen ? 'Close chat (C)' : 'Open chat (C)'}>
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`p-2 sm:p-3 md:p-4 rounded-full transition-colors relative ${
                    isChatOpen
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                </button>
              </Tooltip>

              <Tooltip content={t('videoroom.leaveTooltip')}>
                <button
                  onClick={handleLeave}
                  className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 font-semibold text-xs sm:text-sm md:text-base"
                >
                  <svg
                    className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:inline">{t('videoroom.leave')}</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
