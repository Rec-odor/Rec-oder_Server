const { Configuration, OpenAIApi  } = require("openai");
const secret = require("../../../config/secret");

async function callChatGPT(prompt) {
    
    const configuration = new Configuration({
        apiKey: secret.OPENAI_API_KEY,
    });

    try{
        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
        })
        return response.data.choices[0].message.content;

    } catch(err){
        console.error('Error calling ChatGPT API: ', err);
        return null;
    }

}

module.exports = { callChatGPT };