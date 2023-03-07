// chat-memory.js

const MAX_TOKENS = 4096; // default value for maximum tokens allowed
let tokenLimit = MAX_TOKENS;

/**
 * Sets the maximum number of tokens that can be stored in the conversation history buffer.
 * @param {number} limit - The maximum number of tokens allowed.
 */
function config(limit) {
  if (typeof limit !== 'number' || limit <= 0) {
    throw new Error('Invalid token limit');
  }
  tokenLimit = limit;
  localStorage.setItem('tokenLimit',tokenLimit)
}

/**
 * Calculates the number of tokens in a message.
 * @param {string} message - The message to calculate the tokens for.
 * @returns {number} The number of tokens in the message.
 */
function token_calculate(message) {
  return Math.ceil(message.length / 4);
}

/**
 * Adds a new prompt/response pair to the conversation history buffer.
 * @param {object} message - An object containing the prompt and response.
 * @param {string} user - The user who sent the message.
 * @param {string} chatid - The unique identifier for the chat session.
 * @param {number} timestamp - The timestamp for when the message was sent.
 */
function add(message, user, chatid, timestamp) {
  const { prompt, response } = message;
  const promptTokens = token_calculate(prompt);
  const responseTokens = token_calculate(response);
  const totalTokens = promptTokens + responseTokens;
  const messages = JSON.parse(localStorage.getItem(chatid)) || [];
  while (messages.length > 0 && messages.reduce((acc, cur) => acc + cur.tokens, 0) + totalTokens > tokenLimit) {
    messages.shift();
  }
  messages.push({ prompt, response, user, timestamp, tokens: totalTokens });
  localStorage.setItem(chatid, JSON.stringify(messages));
}

/**
 * Retrieves the most recent prompt/response pairs from the conversation history buffer for a chat session.
 * @param {string} chatid - The unique identifier for the chat session.
 * @param {string} prompt - The prompt for the latest message in the chat session.
 * @returns {object[]} An array of objects containing the prompt and response for the most recent messages in the chat session.
 */
function get_prompt(chatid, prompt) {
    const messages = JSON.parse(localStorage.getItem(chatid)) || [];
    const promptTokens = token_calculate(prompt);
    let totalTokens = promptTokens;
    const relevantMessages = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const { tokens, prompt: messagePrompt, response } = messages[i];
      const messageTokens = tokens_calculate(messagePrompt) + tokens_calculate(response);
      if (totalTokens + messageTokens > tokenLimit) {
        break;
      }
      totalTokens += messageTokens;
      relevantMessages.unshift({ prompt: messagePrompt, response });
    }
    return relevantMessages;
  }
  

module.exports = {
  config,
  add,
  get_prompt,
};
