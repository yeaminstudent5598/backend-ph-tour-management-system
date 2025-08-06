import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middlewares/validateRequest";



const router = Router()

router.post("/create", 
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN), 
    validationRequest(createDivisionSchema),
    DivisionController.createDivision
)