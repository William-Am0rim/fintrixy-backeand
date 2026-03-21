import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../validations";
import { createRecurrenceSchema, updateRecurrenceSchema } from "../validations/recurrence.validation";
import * as recurrenceController from "../controllers/recurrence.controller";

const router = Router();
router.use(authenticate);

router.get("/", recurrenceController.getAll);
router.get("/stats", recurrenceController.getStats);
router.get("/active", recurrenceController.getActive);
router.get("/inactive", recurrenceController.getInactive);
router.get("/upcoming", recurrenceController.getUpcoming);
router.get("/:id", recurrenceController.getById);
router.post("/", validate(createRecurrenceSchema), recurrenceController.create);
router.put("/:id", validate(updateRecurrenceSchema), recurrenceController.update);
router.delete("/:id", recurrenceController.remove);
router.post("/:id/toggle", recurrenceController.toggleActive);
router.post("/:id/process", recurrenceController.processNow);
router.post("/:id/skip", recurrenceController.skipNext);

export default router;
