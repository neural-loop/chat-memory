Functional Specification
========================

Overview
--------

The Prompt Budgeting Tool is a JavaScript module that helps optimize the retention and recall of key details in a chat session while limiting the number of tokens used to avoid excessive charges by the OpenAI API. The tool allows users to add prompt/response pairs to a conversation history buffer, retrieve the most recent prompt/response based on a formula that includes long-term history, medium-term history, keyword match, and recent messages. The tool also supports keyword tagging and configurable storage and summarization engines.

API
---

### Configuration

* `config.tokenLimit(limit: number)` \- Sets the maximum number of tokens that can be stored in the conversation history buffer.
* `config.summary(summaryEngine: string)` \- Sets the summarization engine to be used for generating summaries. The default engine is [https://www.npmjs.com/package/node-summary](https://www.npmjs.com/package/node-summary).
* `config.keyword(keywordEngine: string)` \- Sets the keyword extraction engine to be used for generating keywords in the add functionality. The default engine is [https://www.npmjs.com/package/keyword-extractor](https://www.npmjs.com/package/keyword-extractor).
* `config.storage(storageEngine: string)` \- Sets the storage engine to be used for storing the conversation history buffer. The default engine is localStorage. Other options include databases, SQLite, and cloud storage.

### Adding and Retrieving Messages

* `add(message: object)` \- Adds a new prompt/response pair to the conversation history buffer. The `message` parameter should be an object with two properties: `prompt` and `response`.
* `getPrompt(prompt: string, chatId: string)` \- Retrieves the most recent prompt/response from the conversation history buffer for the specified `chatId`. The function returns a prompt based on a formula that includes long-term history, medium-term history, keyword match, and recent messages.

### Utility Functions

* `tokenCalculate(message: string)` \- Calculates the number of tokens in a message using a default strategy of 4 characters = 1 token.
* `keywordExtract(message: string)` \- Extracts keywords from a message using the configured keyword extraction engine.

Data Model
----------

The conversation history buffer will consist of three buffers: `messages`, `mediumTerm`, and `longTerm`. The sizes of the buffers will be configurable via the `config.tokenLimit()` function.

Each message will be an object with the following properties:

* `prompt`: The prompt message.
* `response`: The response message.
* `userId`: The ID of the user who submitted the message.
* `chatId`: The ID of the chat session.
* `timestamp`: The timestamp of the message.
* `tokenCount`: The number of tokens in the message.
* `keywords`: An array of keywords extracted from the message.

Security Considerations
-----------------------

The tool should sanitize input to prevent any malicious content from being stored. The storage engine should be chosen with security in mind, and users should be aware of the risks associated with third-party implementations that expose data through external errors.

User Interface
--------------

This tool is designed as a module that can be used in web-based chat applications. It does not have a user interface of its own but can be integrated into existing chat applications.