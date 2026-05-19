interface LoadingScreenEffectsProps {
  onComplete?: () => void
}

export const setupLoadingScreenEffects = ({ onComplete }: LoadingScreenEffectsProps) => {
  // Trigger completion after loading animation finishes
  const timer = setTimeout(() => {
    onComplete?.()
  }, 3500)

  return () => clearTimeout(timer)
}
