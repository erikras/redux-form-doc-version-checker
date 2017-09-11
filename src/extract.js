const extractor = regex => string => {
  const groups = regex.exec(string)
  return groups ? groups[1] : undefined
}

export default {
  url: extractor(/\/(\d+\.\d+\.\d+-?(alpha|beta|rc)?\.?\d*)\//),
  tag: extractor(/v(\d+\.\d+\.\d+)/)
}
