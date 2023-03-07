chat-memory
===========

`chat-memory` is a utility package for storing and retrieving conversation history in chat interfaces. It provides a simple API for adding prompt/response pairs to a conversation history buffer and retrieving the most recent prompts up to a certain token limit.

Installation
------------

You can install `chat-memory` using npm:

`npm install chat-memory` 

Usage
-----

To use `chat-memory`, you need to first set the maximum number of tokens allowed in the conversation history buffer using the `config` function:

```
const chatMemory = require('chat-memory');

chatMemory.config(10000); // Set maximum token limit to 10000
```

Once you've set the token limit, you can add new prompt/response pairs to the conversation history buffer using the `add` function:

```
const message = {
  prompt: 'Hello!',
  response: 'Hi there!'
};

const user = 'John';

const chatid = '123';

const timestamp = Date.now();

chatMemory.add(message, user, chatid, timestamp); // Add prompt/response pair to conversation history buffer
```

To retrieve the most recent prompt/response pairs from the conversation history buffer, use the `get_prompt` function:

```
const prompt = 'How are you?';

const relevantMessages = chatMemory.get_prompt(chatid, prompt); // Retrieve most recent prompt/response pairs up to token limit
```

API
---

### `config(limit: number): void`

Sets the maximum number of tokens allowed in the conversation history buffer.

* `limit` \- The maximum number of tokens allowed. Must be a positive integer.

### `add(message: { prompt: string, response: string }, user: string, chatid: string, timestamp: number): void`

Adds a new prompt/response pair to the conversation history buffer.

* `message` \- An object containing the prompt and response for the message.
* `user` \- The user who sent the message.
* `chatid` \- The unique identifier for the chat session.
* `timestamp` \- The timestamp for when the message was sent.

### `get_prompt(chatid: string, prompt: string): object[]`

Retrieves the most recent prompt/response pairs from the conversation history buffer for a chat session.

* `chatid` \- The unique identifier for the chat session.
* `prompt` \- The prompt for the latest message in the chat session.

License
-------

`chat-memory` is released under the Apache-2.0 License.