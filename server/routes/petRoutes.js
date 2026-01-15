import express from "express";
import { verifyToken, requireShelter, requireAdmin } from "../middleware/authMiddleware.js";
import {
  createPet,
  getShelterPets,
  getPetById,
  updatePet,
  deletePet,
  getApprovedPets,
  getPendingReviewPets,
  reviewPet
} from "../controllers/petController.js";

const router = express.Router();

// ============ PUBLIC ROUTES ============
// Get all approved pets (for adopters)
router.get("/", getApprovedPets);

// ============ SHELTER ROUTES ============
// Create a new pet (requires shelter auth)
router.post("/", verifyToken, requireShelter, createPet);

// Get shelter's own pets (MUST come before /:id to avoid matching "shelter" as id)
router.get("/shelter/my-pets", verifyToken, requireShelter, getShelterPets);

// ============ ADMIN ROUTES ============
// Get pets pending review (MUST come before /:id to avoid matching "admin" as id)
router.get("/admin/pending", verifyToken, requireAdmin, getPendingReviewPets);

// Approve or reject a pet
router.post("/admin/review/:id", verifyToken, requireAdmin, reviewPet);

// ============ PARAMETERIZED ROUTES (must come LAST) ============
// Get single pet by ID
router.get("/:id", getPetById);

// Update a pet
router.put("/:id", verifyToken, requireShelter, updatePet);

// Delete a pet
router.delete("/:id", verifyToken, requireShelter, deletePet);

export default router;
