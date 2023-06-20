const sanitize = require("sanitize-html");

// Function to sanitize user input
function sanitizeInput(input) {
  // Define allowed HTML tags and atributes
  const allowedTags = ["b", "i", "u", "em", "strong"];
  const allowedAttributes = {
    "p": ["style"],
  };

  const sanitizedInput = sanitize(input, {
    allowedTags,
    allowedAttributes,
  });
  return sanitizedInput;
}

module.exports = sanitizeInput;