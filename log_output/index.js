const logger = () => {
  const currentDate = new Date().toISOString()
  const hash = crypto.randomUUID()

  console.log(`${currentDate}: ${hash}`)
  setTimeout(() => logger(), 5000)
}

logger()
