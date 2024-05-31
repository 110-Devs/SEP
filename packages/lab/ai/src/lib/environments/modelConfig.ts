import environment from './environment';

/**
 * Represents the properties required for making a request.
 */
type requestProps = {
  prompt: string;
};

/**
 * Generates a request string based on the provided prompt.
 * @param {requestProps} props - The request properties.
 * @returns {string} - The generated request string.
 */
export const request = ({ prompt }: requestProps): string => {
  return `
  ${environment.SYSTEM_PROMPT}

  \`\`\`javascript
    function doTask() {
      // User Prompt: ${prompt}
  }
  \`\`\`
  `;
};

/**
 * Represents the model file template.
 */
export const modelfile = `
FROM ${environment.MODEL_NAME}
TEMPLATE "<start_of_turn>user
{{ if .System }}{{ .System }} {{ end }}{{ .Prompt }}<end_of_turn>
<start_of_turn>model
{{ .Response }}<end_of_turn>
"
SYSTEM """
${environment.SYSTEM_PROMPT}
"""
`;
