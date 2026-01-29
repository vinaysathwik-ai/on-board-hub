
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function listModels() {
    try {
        if (!process.env.GEMINI_API_KEY) throw new Error("No API Key");

        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("VALID_MODELS_START");
            data.models.forEach(m => {
                // simplified output
                const name = m.name.replace("models/", "");
                console.log(name);
            });
            console.log("VALID_MODELS_END");
        } else {
            console.log("ERROR_LISTING: " + JSON.stringify(data));
        }

    } catch (err) {
        console.error("ExecError:", err);
    }
}

listModels();
