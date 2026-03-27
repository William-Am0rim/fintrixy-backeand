"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validations_1 = require("../validations");
const recurrence_validation_1 = require("../validations/recurrence.validation");
const recurrenceController = __importStar(require("../controllers/recurrence.controller"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", recurrenceController.getAll);
router.get("/stats", recurrenceController.getStats);
router.get("/active", recurrenceController.getActive);
router.get("/inactive", recurrenceController.getInactive);
router.get("/upcoming", recurrenceController.getUpcoming);
router.get("/:id", recurrenceController.getById);
router.post("/", (0, validations_1.validate)(recurrence_validation_1.createRecurrenceSchema), recurrenceController.create);
router.put("/:id", (0, validations_1.validate)(recurrence_validation_1.updateRecurrenceSchema), recurrenceController.update);
router.delete("/:id", recurrenceController.remove);
router.post("/:id/toggle", recurrenceController.toggleActive);
router.post("/:id/process", recurrenceController.processNow);
router.post("/:id/skip", recurrenceController.skipNext);
exports.default = router;
//# sourceMappingURL=recurrence.routes.js.map