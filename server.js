const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze-risks", async (req, res) => {
  const { patient, riskFactors } = req.body;

  const system_prompt = `
    You're an expert dermatologist. The user will give you information about a patient with a skin condition.

    Your job is to identify risk factors, given the patient's allergies, medication, and lifestyle, that could be causing their condition.

    For example, if the patient has a history of smoking and has a condition that could be caused by smoking, then include "Smoking history" in your list of risk factors for that patient.

    Another example, if the patient has reported experiencing increased levels of stress lately and they have a condition that could be caused by stress, then include "Stress" in your list of risk factors.

    Respond in JSON format. For example { "risks": ["Smoking history"] }
  `;

  const prompt = `
    Analyze the following patient information and identify potential risk factors from the given list:
    
    Patient Information:
    - Condition: ${patient.condition}
    - Allergies: ${patient.allergies}
    - Medications: ${patient.medications}
    - Notes: ${patient.notes}
    - Medical History: ${patient.history}
    
    Risk Factors to consider: ${riskFactors.join(", ")}
    
    Please provide a list of applicable risk factors from the given list. If no risks are found, return an empty array.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 100,
      temperature: 1,
    });

    const content = JSON.parse(response.choices[0].message.content);
    const risks = content.risks || ["No Risks Found"];

    res.json({ risks });
  } catch (error) {
    console.error("Error analyzing patient risks:", error);
    res.status(500).json({ error: "Error Analyzing Risks" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
