const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const { OpenAI } = require("openai");

dotenv.config();
const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Create a pool for database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Abodh@2000',
    database: process.env.DB_NAME || 'chatbot',
    connectionLimit: 10
});

// Check database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected!');
        connection.release();
    }
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "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" // This is also the default, can be omitted
});

// Endpoint to handle natural language queries
app.post('/query', async (req, res) => {
    let { query } = req.body;
    query="Give valid Sql Query that can perform task from Database , Only and Only Sql perform on Sigle row of Database "+query+"  , My Table name is insurancedata  and column names are Year , BrokerName , GWP , PlannedGWP , MarketType "
    try {
        // Step 1: Convert natural language query to SQL using AI
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
        });
        console.log(query);
        // Extract SQL query from the OpenAI response
        const sqlQuery = chatCompletion.choices[0].message.content;
        console.log("Generated SQL Query:", sqlQuery);

        // Step 2: Execute the SQL query against the database
        pool.query(sqlQuery, async (error, results) => {
            if (error) {
                console.error("SQL Error:", error);
                // Provide contextually appropriate responses based on the error code
                if (error.code === 'ER_PARSE_ERROR') {
                    res.json({ data: "Sorry, I didn't understand your query. Please try again with a different question." });
                } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
                    res.json({ data: "Sorry, I'm unable to access the requested information at the moment. Please try again later." });
                } else {
                    res.status(500).json({ error: "An error occurred while executing the SQL query" });
                }
            } else {
                // Log the SQL results for debugging purposes
                console.log("SQL Results:", results);
            
                // Convert SQL results to normal English using OpenAI's chat completions
                const convertToNormal = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: "Convert to Normal English Like chat bot: " + JSON.stringify(results) }],
                });
                
                // Check if the response from OpenAI contains choices
                if (convertToNormal && convertToNormal.choices && convertToNormal.choices.length > 0) {
                    // Extract the content from the response
                    const data = convertToNormal.choices[0].message.content;
            
                    // Send the converted data back to the client
                    res.json({ data });
                } else {
                    console.error("No valid response from OpenAI.");
                    res.status(500).json({ error: "No valid response from OpenAI" });
                }
            }
            
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
