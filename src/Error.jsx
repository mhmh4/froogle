export function Error({ isTimeout = false }) {
  const errorMessage = isTimeout
    ? "Error: We're unable to process your request at the moment. Please try again later."
    : "Error: Recipes cannot be generated for the provided ingredients. Please check your input and try again.";

  return <div className="error">{errorMessage}</div>;
}
