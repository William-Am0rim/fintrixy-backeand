import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../validations";
import { createTransactionSchema, updateTransactionSchema } from "../validations/transaction.validation";
import * as transactionController from "../controllers/transaction.controller";

const router = Router();
router.use(authenticate);

router.get("/", transactionController.getAll);
router.get("/stats", transactionController.getStats);
router.get("/recent", transactionController.getRecent);
router.get("/:id", transactionController.getById);
router.post("/", validate(createTransactionSchema), transactionController.create);
router.put("/:id", validate(updateTransactionSchema), transactionController.update);
router.delete("/:id", transactionController.remove);

export default router;
