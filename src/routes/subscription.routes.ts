import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as subscriptionController from "../controllers/subscription.controller";

const router = Router();
router.use(authenticate);

router.get("/", subscriptionController.getSubscription);
router.get("/limits", subscriptionController.getPlanLimits);
router.get("/stats", subscriptionController.getStats);
router.get("/check", subscriptionController.checkLimit);
router.post("/upgrade", subscriptionController.upgradeToPro);
router.post("/downgrade", subscriptionController.downgradeToFree);

export default router;
