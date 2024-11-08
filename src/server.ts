import express, { Request, Response } from "express";
import fetch from "node-fetch";
import { Buffer } from "buffer";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const apiSecretKey = "your_secret_key";
const encryptedApiSecretKey = "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");

app.post("/api/verify-payment", async (req: Request, res: Response) => {
    const { paymentKey, orderId, amount } = req.body;

    try {
        const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
            method: "POST",
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId, amount, paymentKey }),
        });

        const result = await response.json();

        if (!response.ok) {
            res.status(response.status).json(result);
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
