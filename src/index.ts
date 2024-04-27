import { ElevenLabsClient, play } from "elevenlabs";
import * as fs from 'fs';

// Initialize ElevenLabs Client with your API Key
const elevenlabs = new ElevenLabsClient({
  apiKey: "YOUR_API_KEY"
});

// Function to create a pronunciation dictionary from a file and play the word "Tomato" using Rachel's voice
async function createPronunciationDictionaryAndPlay() {
  const fileStream = fs.createReadStream("/path/to/your/pronunciation/file");
  
  const dictionary = await elevenlabs.pronunciationDictionary.create({
    name: "TomatoDict",
    file: fileStream
  });

  const audio = await elevenlabs.textToSpeech.generate({
    voiceId: "Rachel",
    text: "Tomato",
    pronunciationDictionaryId: dictionary.id
  });

  await play(audio);
  return dictionary.id; // Return the dictionary ID for further use
}

// Function to remove a rule from the pronunciation dictionary and play the word "Tomato" using Rachel's voice
async function removeRuleFromDictionary(dictionaryId: string, ruleId: string) {
  await elevenlabs.pronunciationDictionary.removeRule({
    dictionaryId: dictionaryId,
    ruleId: ruleId
  });

  const audio = await elevenlabs.textToSpeech.generate({
    voiceId: "Rachel",
    text: "Tomato"
  });

  await play(audio);
}

// Function to add rules to the pronunciation dictionary and play the word "Tomato" using Rachel's voice
async function addRulesAndPlaySound(dictionaryId: string) {
  await elevenlabs.pronunciationDictionary.addRules({
    dictionaryId: dictionaryId,
    rules: [
      { type: "alias", string_to_replace: "Tomato", alias: "Tomayto" }
    ]
  });

  const audio = await elevenlabs.textToSpeech.generate({
    voiceId: "Rachel",
    text: "Tomato",
    pronunciationDictionaryId: dictionaryId
  });

  await play(audio);
}

// Main function to orchestrate the steps
async function main() {
  try {
    const dictionaryId = await createPronunciationDictionaryAndPlay();
    console.log("Dictionary created and Tomato pronounced with Rachel's voice.");

    // Assuming you know the rule ID, you would replace 'ruleId' with the actual ID.
    await removeRuleFromDictionary(dictionaryId, "ruleId");
    console.log("Rule removed and Tomato pronounced with Rachel's voice.");

    await addRulesAndPlaySound(dictionaryId);
    console.log("Rules added and Tomato pronounced with Rachel's voice.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
