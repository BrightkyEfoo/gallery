import { Router } from "express";
import commentaireController from "./commentaire.controller.js";


const commentaireRouter = Router()

commentaireRouter.route('/')
.get(ErrorHandelCommentaire)
.post(commentaireController.create)

commentaireRouter.route("/:id")
.delete(commentaireController.remove)

/**
 * 
 * @param {request} req 
 * @param {anwserRequest} res 
 * @returns response
 */
function ErrorHandelCommentaire(req, res) {
    const msg = "request not found"
    return res.status(401).json({msg})
}

export default commentaireRouter