/**
 * Asynchronous handler to wrap around route handlers for error handling.
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} A function that takes Express's req, res, and next parameters.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({ message: error.message });
  });

export default asyncHandler;
