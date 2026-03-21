import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../validations";
import { createInstallmentSchema, updateInstallmentSchema, payInstallmentSchema } from "../validations/installment.validation";
import * as installmentController from "../controllers/installment.controller";

const router = Router();
router.use(authenticate);

router.get("/", installmentController.getAll);
router.get("/stats", installmentController.getStats);
router.get("/active", installmentController.getActive);
router.get("/completed", installmentController.getCompleted);
router.get("/upcoming", installmentController.getUpcoming);
router.get("/overdue", installmentController.getOverdue);
router.get("/:id", installmentController.getById);
router.post("/", validate(createInstallmentSchema), installmentController.create);
router.put("/:id", validate(updateInstallmentSchema), installmentController.update);
router.delete("/:id", installmentController.remove);
router.post("/:id/pay", validate(payInstallmentSchema), installmentController.payInstallment);

export default router;
