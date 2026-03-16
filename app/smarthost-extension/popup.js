const messageInput = document.getElementById("message");
const generateBtn = document.getElementById("generate");
const resultBox = document.getElementById("result");

generateBtn.addEventListener("click", () => {
  const input = messageInput.value.trim();

  if (!input) {
    resultBox.textContent = "Write a guest message.";
    return;
  }

  const url =
    "https://smarthost-ai.vercel.app/?message=" + encodeURIComponent(input);

  window.open(url, "_blank");
  resultBox.textContent = "Opened SmartHost AI in a new tab.";
});