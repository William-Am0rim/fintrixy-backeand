import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../validations";
import { createWalletSchema, updateWalletSchema } from "../validations/wallet.validation";
import * as walletController from "../controllers/wallet.controller";

const router = Router();
router.use(authenticate);

router.get("/", walletController.getAll);
router.get("/stats", walletController.getStats);
router.get("/:id", walletController.getById);
router.post("/", validate(createWalletSchema), walletController.create);
router.put("/:id", validate(updateWalletSchema), walletController.update);
router.delete("/:id", walletController.remove);
router.post("/:id/balance", walletController.updateBalance);

export default router;
