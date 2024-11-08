import express, { Request, Response } from "express";
import fetch from "node-fetch";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(express.json());

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
const apiSecretKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

const encryptedWidgetSecretKey = "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");
const encryptedApiSecretKey = "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");

// 결제위젯 승인
app.post("/confirm/widget", async (req: Request, res: Response) => {
    const { paymentKey, orderId, amount } = req.body;

    try {
        const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
            method: "POST",
            headers: {
                Authorization: encryptedWidgetSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId,
                amount,
                paymentKey,
            }),
        });

        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            return res.status(response.status).json(result);
        }

        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error confirming widget payment:", error);
        res.status(500).json({ error: "Payment confirmation failed" });
    }
});

// 결제창 승인
app.post("/confirm/payment", async (req: Request, res: Response) => {
    const { paymentKey, orderId, amount } = req.body;

    try {
        const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
            method: "POST",
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId,
                amount,
                paymentKey,
            }),
        });

        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            return res.status(response.status).json(result);
        }

        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error confirming payment:", error);
        res.status(500).json({ error: "Payment confirmation failed" });
    }
});

// 브랜드페이 승인
app.post("/confirm/brandpay", async (req: Request, res: Response) => {
    const { paymentKey, orderId, amount, customerKey } = req.body;

    try {
        const response = await fetch("https://api.tosspayments.com/v1/brandpay/payments/confirm", {
            method: "POST",
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId,
                amount,
                paymentKey,
                customerKey,
            }),
        });

        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            return res.status(response.status).json(result);
        }

        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error confirming brandpay payment:", error);
        res.status(500).json({ error: "Payment confirmation failed" });
    }
});

// 브랜드페이 Access Token 발급
app.get("/callback-auth", async (req: Request, res: Response) => {
    const { customerKey, code } = req.query as { customerKey: string; code: string };

    try {
        const response = await fetch("https://api.tosspayments.com/v1/brandpay/authorizations/access-token", {
            method: "POST",
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grantType: "AuthorizationCode",
                customerKey,
                code,
            }),
        });

        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            return res.status(response.status).json(result);
        }

        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).json({ error: "Access token retrieval failed" });
    }
});

const billingKeyMap = new Map<string, string>();

// 빌링키 발급
app.post("/issue-billing-key", async (req: Request, res: Response) => {
    const { customerKey, authKey } = req.body;

    try {
        const response = await fetch(`https://api.tosspayments.com/v1/billing/authorizations/issue`, {
            method: "POST",
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerKey,
                authKey,
            }),
        });

        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            return res.status(response.status).json(result);
        }

        billingKeyMap.set(customerKey, result.billingKey);
        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error issuing billing key:", error);
        res.status(500).json({ error: "Billing key issuance failed" });
    }
});

// 카드 자동결제 승인
app.post("/confirm-billing", async (req: Request, res: Response) => {
    const { customerKey, amount, orderId, orderName, customerEmail, customerName } = req.body;

    try {
        const billingKey = billingKeyMap.get(customerKey);
        if (!billingKey) {
            return res.status(404).json({ error: "Billing key not found" });
        }

        const response = await fetch(`https://api.tosspayments.com/v1/billing/${billingKey}`, {
            method: "POST",
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerKey,
                amount,
                orderId,
                orderName,
                customerEmail,
                customerName,
            }),
        });

        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            return res.status(response.status).json(result);
        }

        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error confirming billing:", error);
        res.status(500).json({ error: "Billing confirmation failed" });
    }
});

app.listen(port, () => console.log(`http://localhost:${port} 으로 샘플 앱이 실행되었습니다.`));
