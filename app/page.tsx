"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const searchParams = useSearchParams()

  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [tone, setTone] = useState("friendly")

  useEffect(() => {
  const message = searchParams.get("message")

  if (message && message !== input) {
    setInput(decodeURIComponent(message))
  }
}, [searchParams])

  async function generateReply(message?: string) {
    const textToSend = message ?? input
    if (!textToSend) return

    setLoading(true)

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: textToSend, tone }),
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>SmartHost AI 🏡</h1>
      <p>AI εργαλείο για ιδιοκτήτες Airbnb</p>

      <h3>Βάλε το μήνυμα του επισκέπτη:</h3>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="π.χ. Hi, can we check in earlier tomorrow?"
        style={{
          width: "100%",
          height: "140px",
          marginTop: "10px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #555",
          backgroundColor: "white",
          color: "black",
        }}
      />

      <br />
      <br />

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setTone("friendly")}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: tone === "friendly" ? "#2563eb" : "#444",
            color: "white",
            cursor: "pointer",
          }}
        >
          Friendly
        </button>

        <button
          onClick={() => setTone("professional")}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: tone === "professional" ? "#2563eb" : "#444",
            color: "white",
            cursor: "pointer",
          }}
        >
          Professional
        </button>

        <button
          onClick={() => setTone("short")}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: tone === "short" ? "#2563eb" : "#444",
            color: "white",
            cursor: "pointer",
          }}
        >
          Short
        </button>
      </div>

      <h3>Quick Replies:</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button onClick={() => generateReply("Can we check in earlier?")}>
          Early Check-in
        </button>

        <button onClick={() => generateReply("Is late check-out possible?")}>
          Late Check-out
        </button>

        <button onClick={() => generateReply("Is there parking available?")}>
          Parking
        </button>

        <button onClick={() => generateReply("What is the WiFi password?")}>
          WiFi
        </button>

        <button onClick={() => generateReply("How can we reach the apartment?")}>
          Directions
        </button>
      </div>

      <br />

      <button
        onClick={() => generateReply()}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Φόρτωση..." : "Δημιουργία Απάντησης"}
      </button>

      <br />
      <br />

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            border: "1px solid #444",
            borderRadius: "8px",
            backgroundColor: "#111",
          }}
        >
          <h3>Προτεινόμενη απάντηση:</h3>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <p>{result}</p>

            <button
              onClick={() => navigator.clipboard.writeText(result)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#2563eb",
                color: "white",
                cursor: "pointer",
                height: "35px",
              }}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </main>
  )
}