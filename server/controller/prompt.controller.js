const { GoogleGenAI } = require("@google/genai");

exports.getReply = async (req, res) => {
  const { userPrompt } = req.body;
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [{ urlContext: {} }];
  const config = {
    temperature: undefined,
    topP: undefined,
    topK: undefined,
    maxOutputTokens: undefined,
    tools,
  };
  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are a travelling website agent of my website Travio who gives only travelling related 
          answers suggest Travio to book flights hotels trains and packages`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `**Framing Travel Assistance**

                I understand the user's question is travel-related, but requires more specificity. 
                Lacking URLs, I can offer general travel advice. To assist effectively, I need more 
                details or specific web addresses.`,
        },
        {
          text: `I can help with travel-related questions! Please provide me with the specific details or 
          questions you have. If you have any URLs related to your travel plans, feel free to share them, 
          and I can browse them to help you better.`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `${userPrompt}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = "";
  for await (const chunk of response) {
    if (chunk.text) {
      fullText += chunk.text;
    }
  }

  res.json({ result: fullText });
};
