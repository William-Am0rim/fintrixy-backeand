import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { paymentService } from "../services/payment.service";
import { parsePixCopyPaste, formatPixAmount } from "../utils/pix-parser";

const router = Router();

router.post("/create", authenticate, async (req: any, res: any) => {
  try {
    const { amount, plan } = req.body;
    const userId = req.user.id;

    const result = await paymentService.createPixCharge(amount, userId, plan);

    if (result.success) {
      res.json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (error: any) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ success: false, message: "Erro ao criar pagamento" });
  }
});

router.get("/status/:billingId", authenticate, async (req: any, res: any) => {
  try {
    const { billingId } = req.params;

    const result = await paymentService.getPaymentStatus(billingId);

    if (result.success) {
      res.json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (error: any) {
    console.error("Erro ao verificar pagamento:", error);
    res.status(500).json({ success: false, message: "Erro ao verificar pagamento" });
  }
});

router.post("/webhook", async (req: any, res: any) => {
  try {
    const payload = req.body;
    
    const result = await paymentService.processWebhook(payload);

    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (error: any) {
    console.error("Erro ao processar webhook:", error);
    res.status(500).json({ success: false, message: "Erro ao processar webhook" });
  }
});

router.post("/parse", async (req: any, res: any) => {
  try {
    const { pixCode } = req.body;

    if (!pixCode) {
      return res.status(400).json({ success: false, message: "Código PIX não fornecido" });
    }

    const parsedData = parsePixCopyPaste(pixCode);

    if (!parsedData) {
      return res.status(400).json({ success: false, message: "Código PIX inválido" });
    }

    res.json({
      success: true,
      data: {
        ...parsedData,
        formattedAmount: formatPixAmount(parsedData.amount),
      },
    });
  } catch (error: any) {
    console.error("Erro ao parsear código PIX:", error);
    res.status(500).json({ success: false, message: "Erro ao processar código PIX" });
  }
});

export default router;
