/**
 * Filters patients based on the selected filter criteria.
 * @param {Array} patients - The list of patients to filter.
 * @param {Object} filter - The selected filter criteria.
 * @returns {Array} - The filtered list of patients.
 */
function filterPatients(patients, filters) {
  if (!filters || Object.keys(filters).length === 0) {
    return patients;
  }

  return patients.filter((patient) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "allergies") {
        return patient[key].split(", ").includes(value);
      }
      return patient[key] === value;
    });
  });
}

export default filterPatients;
