/**
 * Fetches risk factors from the server.
 * @async
 * @function fetchRiskFactors
 * @returns {Promise<string[]>} A promise that resolves to an array of risk factor names.
 * @throws {Error} If there's an error fetching the risk factors.
 */
export async function fetchRiskFactors() {
  try {
    const response = await fetch("http://localhost:3001/risk-factors");
    if (!response.ok) {
      throw new Error("Failed to fetch risk factors");
    }
    const data = await response.json();
    return data.map((factor) => factor.name);
  } catch (error) {
    console.error("Error fetching risk factors:", error);
    return [];
  }
}
