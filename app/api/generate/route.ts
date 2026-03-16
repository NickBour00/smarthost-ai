import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const input = body.input || ""
  const tone = body.tone || "friendly"

  const hasGreek = /[α-ωΑ-Ω]/.test(input)
  const lowerInput = input.toLowerCase()

  let detectedTopic = ""

  if (lowerInput.includes("parking")) {
    detectedTopic = "parking"
  } else if (lowerInput.includes("wifi")) {
    detectedTopic = "wifi"
  } else if (lowerInput.includes("check in") || lowerInput.includes("check-in")) {
    detectedTopic = "checkin"
  } else if (lowerInput.includes("directions") || lowerInput.includes("address")) {
    detectedTopic = "directions"
  }

  let text = ""

  if (detectedTopic === "parking") {
    if (hasGreek) {
      text = "Ναι, υπάρχει διαθέσιμο parking κοντά στο διαμέρισμα. Θα σας στείλουμε και περισσότερες πληροφορίες πριν την άφιξή σας."
    } else {
      text = "Yes, there is parking available near the apartment. We will also provide more detailed information before your arrival."
    }
  } else if (detectedTopic === "wifi") {
    if (hasGreek) {
      text = "Ναι, το διαμέρισμα διαθέτει WiFi. Θα σας στείλουμε το όνομα του δικτύου και τον κωδικό πριν το check-in."
    } else {
      text = "Yes, the apartment has WiFi. We will send you the network name and password before check-in."
    }
  } else if (detectedTopic === "checkin") {
    if (hasGreek) {
      text = "Το check-in γίνεται κανονικά αργότερα μέσα στην ημέρα, αλλά αν το διαμέρισμα είναι έτοιμο νωρίτερα θα χαρούμε να σας εξυπηρετήσουμε."
    } else {
      text = "Check-in is normally later in the day, but if the apartment is ready earlier we will be happy to accommodate you."
    }
  } else if (detectedTopic === "directions") {
    if (hasGreek) {
      text = "Θα σας στείλουμε αναλυτικές οδηγίες και την ακριβή τοποθεσία του διαμερίσματος πριν την άφιξή σας."
    } else {
      text = "We will send you detailed directions and the exact apartment location before your arrival."
    }
  } else {
    if (hasGreek) {
      if (tone === "friendly") {
        text = `Γεια σας! Ευχαριστούμε πολύ για το μήνυμά σας. Σχετικά με το αίτημά σας: "${input}", θα κάνουμε το καλύτερο δυνατό για να σας εξυπηρετήσουμε και θα σας ενημερώσουμε σύντομα. Είμαστε στη διάθεσή σας για οτιδήποτε χρειαστείτε!`
      } else if (tone === "professional") {
        text = `Καλησπέρα σας. Ευχαριστούμε για την επικοινωνία. Σχετικά με το αίτημά σας: "${input}", θα εξετάσουμε τη δυνατότητα εξυπηρέτησής σας και θα σας επιβεβαιώσουμε το συντομότερο δυνατό τις σχετικές λεπτομέρειες. Παραμένουμε στη διάθεσή σας για οποιαδήποτε επιπλέον πληροφορία.`
      } else {
        text = `Γεια σας! Ευχαριστούμε για το μήνυμά σας. Για το αίτημά σας: "${input}", θα σας ενημερώσουμε σύντομα.`
      }
    } else {
      if (tone === "friendly") {
        text = `Hi! Thank you so much for your message. Regarding your request: "${input}", we’ll do our best to help and get back to you as soon as possible. Please let us know if you need anything else!`
      } else if (tone === "professional") {
        text = `Hello, and thank you for your message. Regarding your request: "${input}", we will review it and confirm the relevant details as soon as possible. Please do not hesitate to contact us if you require any further information.`
      } else {
        text = `Hi! Thank you for your message. Regarding "${input}", we will get back to you shortly.`
      }
    }
  }

  return NextResponse.json({
    result: text,
  })
}