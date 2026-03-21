import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../validations";
import { createGoalSchema, updateGoalSchema, contributeGoalSchema } from "../validations/goal.validation";
import * as goalController from "../controllers/goal.controller";

const router = Router();
router.use(authenticate);

router.get("/", goalController.getAll);
router.get("/stats", goalController.getStats);
router.get("/overdue", goalController.getOverdue);
router.get("/:id", goalController.getById);
router.post("/", validate(createGoalSchema), goalController.create);
router.put("/:id", validate(updateGoalSchema), goalController.update);
router.delete("/:id", goalController.remove);
router.post("/:id/contribute", validate(contributeGoalSchema), goalController.addContribution);

export default router;
