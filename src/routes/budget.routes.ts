import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../validations";
import { createBudgetSchema, updateBudgetSchema } from "../validations/budget.validation";
import * as budgetController from "../controllers/budget.controller";

const router = Router();
router.use(authenticate);

router.get("/", budgetController.getAll);
router.get("/stats", budgetController.getStats);
router.get("/exceeded", budgetController.getExceeded);
router.get("/:id", budgetController.getById);
router.post("/", validate(createBudgetSchema), budgetController.create);
router.put("/:id", validate(updateBudgetSchema), budgetController.update);
router.delete("/:id", budgetController.remove);
router.post("/:id/spent", budgetController.updateSpent);
router.post("/:id/reset", budgetController.resetSpent);

export default router;
