export function Error({ isTimeout = false }) {
  const errorMessage = isTimeout
    ? "Oh no, something went wrong. We are unable to process your request at the moment. Please try again later."
    : "Error: Recipes cannot be generated for the provided ingredients. Please check your input and try again.";

  return <div style={{ width: "90%" }}>{errorMessage}</div>;
}
