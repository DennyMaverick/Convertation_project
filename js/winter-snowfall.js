"use strict"

const WinterSnowfall = (() => {
  const canvas = document.getElementById("winterSnowfall")

  if (!canvas) return

  const ctx = canvas.getContext("2d")

  if (!ctx) return

  // Seasonal settings
  const seasons = {
    10: {density: 0.75, speed: 0.85}, // November
    11: {density: 1.2, speed: 1}, // December
    0: {density: 1, speed: 0.9}, // January
    1: {density: 0.55, speed: 0.75}, // February
  }

  // Reduced motion preference
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

  let width = 0
  let height = 0
  let particles = []
  let animationId = null
  let previousTime = 0
  let elapsedTime = 0

  // Check current season
  function getSeason() {
    const month = new Date().getMonth()

    return seasons[month] || null
  }

  // Create snowflake
  function createParticle(randomY = false) {
    const season = getSeason()

    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -5,

      radius: Math.random() * 1.8 + 0.6,

      speedY: (18 + Math.random() * 30) * season.speed,
      speedX: (Math.random() - 0.5) * 10,

      sway: Math.random() * 12 + 3,
      phase: Math.random() * Math.PI * 2,

      opacity: Math.random() * 0.45 + 0.3,
    }
  }

  // Calculate particle quantity
  function getParticleCount() {
    const season = getSeason()

    const density = season.density
    const area = width * height

    return Math.max(18, Math.min(110, Math.round((area / 18000) * density)))
  }

  // Initialize canvas
  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

    width = window.innerWidth
    height = window.innerHeight

    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

    const count = getParticleCount()

    particles = Array.from({length: count}, () => createParticle(true))
  }

  // Draw snowflakes
  function drawParticles(deltaTime) {
    ctx.clearRect(0, 0, width, height)

    particles.forEach((particle) => {
      const sway = Math.sin(elapsedTime * 0.8 + particle.phase) * particle.sway

      particle.x += (particle.speedX + sway) * deltaTime
      particle.y += particle.speedY * deltaTime

      // Reset particle after leaving the screen
      if (particle.y > height + 5) {
        Object.assign(particle, createParticle())
      }

      if (particle.x < -10) {
        particle.x = width + 5
      } else if (particle.x > width + 10) {
        particle.x = -5
      }

      // Render snowflake
      ctx.beginPath()

      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)

      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`

      ctx.fill()
    })
  }

  // Animation loop
  function animate(timestamp) {
    if (!previousTime) previousTime = timestamp

    const deltaTime = Math.min((timestamp - previousTime) / 1000, 0.05)

    previousTime = timestamp
    elapsedTime += deltaTime

    drawParticles(deltaTime)

    animationId = requestAnimationFrame(animate)
  }

  // Start snowfall
  function start() {
    if (animationId !== null) return

    if (document.hidden || motionQuery.matches) return

    if (!getSeason()) return

    canvas.classList.add("winter-snowfall--active")

    resizeCanvas()

    previousTime = 0

    animationId = requestAnimationFrame(animate)
  }

  // Stop snowfall
  function stop() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    canvas.classList.remove("winter-snowfall--active")

    ctx.clearRect(0, 0, width, height)
  }

  // Handle browser tab visibility
  function handleVisibility() {
    if (document.hidden) {
      stop()
    } else {
      start()
    }
  }

  // Handle reduced motion preference
  function handleMotionChange() {
    if (motionQuery.matches) {
      stop()
    } else {
      start()
    }
  }

  // Event listeners
  window.addEventListener("resize", resizeCanvas)

  document.addEventListener("visibilitychange", handleVisibility)

  motionQuery.addEventListener("change", handleMotionChange)

  // Initialize
  start()

  return {
    start,
    stop,
  }
})()
