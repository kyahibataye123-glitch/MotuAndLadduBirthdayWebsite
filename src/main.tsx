import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

const backgroundLayers = [
  ["night", "linear-gradient(180deg, #06112838, #060713b8 88%)"],
  [
    "burgundy",
    "radial-gradient(circle at 50% 45%, #c94a7724, transparent 45%), linear-gradient(180deg, #2106174d, #09040db8)",
  ],
  ["sunset", "linear-gradient(180deg, #2417442e, #5b203d66 72%, #1b0a18a8)"],
  ["garden", "linear-gradient(180deg, #10153038, #17101ba8)"],
  ["celebrate", "linear-gradient(180deg, #14071338, #190812a8)"],
  ["scrapbook", "linear-gradient(180deg, #1b09115c, #140810b8)"],
  ["gallery", "linear-gradient(180deg, #17091370, #09060bc7)"],
  ["blush", "linear-gradient(180deg, #17091366, #09060bc2)"],
  ["paper", "linear-gradient(180deg, #17091366, #09060bc2)"],
  ["quiz", "linear-gradient(180deg, #180d2266, #130811bd)"],
  ["secret", "linear-gradient(180deg, #14080a4f, #090609b8)"],
  [
    "music",
    "radial-gradient(circle at 50% 42%, #8f2c4a26, transparent 40%), linear-gradient(180deg, #17070c4d, #170817bd)",
  ],
  ["letter", "linear-gradient(180deg, #3a0d124d, #4c1119a8)"],
  ["finale", "linear-gradient(180deg, #15060b45, #170611bd)"],
] as const

const backgroundStyles = document.createElement("style")
backgroundStyles.textContent = backgroundLayers
  .map(([tone, layers], index) => {
    const page = String(index + 1).padStart(2, "0")
    return `.page-${tone}::before{background-image:${layers},url("${assetUrl(`backgrounds/custom/page-${page}.webp`)}")}`
  })
  .join("\n")
document.head.append(backgroundStyles)

const publicAssetPattern = /^\/(memories|audio)\//
const resolveMediaSource = (source: string) =>
  assetUrl(source.slice(1).replace(/\.m4a$/, ".mp3"))

const updateMediaSources = (node: Node) => {
  const elements =
    node instanceof HTMLImageElement || node instanceof HTMLAudioElement
      ? [node]
      : node instanceof Element
        ? Array.from(node.querySelectorAll("img, audio"))
        : []

  elements.forEach((element) => {
    const source = element.getAttribute("src")
    if (source && publicAssetPattern.test(source)) {
      element.setAttribute("src", resolveMediaSource(source))
    }
  })
}

const rootElement = document.getElementById("root")!

new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach(updateMediaSources)
  })
}).observe(rootElement, { childList: true, subtree: true })

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
