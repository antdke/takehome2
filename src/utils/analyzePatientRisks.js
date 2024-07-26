/**
 * Analyzes patient risks based on the provided patient information and risk factors.
 * @async
 * @function analyzePatientRisks
 * @param {Object} patient - The patient object containing relevant information.
 * @param {string[]} riskFactors - An array of risk factor names to consider.
 * @returns {Promise<string[]>} A promise that resolves to an array of applicable risk factors for the patient.
 * @throws {Error} If there's an error analyzing patient risks.
 */
export async function analyzePatientRisks(patient, riskFactors) {
  try {
    const response = await fetch("http://localhost:3002/analyze-risks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patient, riskFactors }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze patient risks");
    }

    const data = await response.json();
    return data.risks.filter((risk) => riskFactors.includes(risk));
  } catch (error) {
    console.error("Error analyzing patient risks:", error);
    return ["Error Analyzing Risks"];
  }
}
