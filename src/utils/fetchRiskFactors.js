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
