import commentaireValidate from "./commentaire.validate.js"
import commentaireService from "./commentaire.service.js"


// request create comment
const create = async (req, res) =>{
    const {auteur, photo, texte, commentaireId} = req.body
    const dataCommentaire = {
        auteur,
        photo,
        texte,
        commentaireId
    }
    try {
        const { error } = commentaireValidate.validate(dataCommentaire)
        if (!error){
            const commentaire = await commentaireService.create(dataCommentaire)
            const msg = "commentaire creer avec succes"
            return res.status(200).json({msg, commentaire})
        }else{
            return res.json({
                msg: "error when create comment",
                error: error.details[0].message,})
        }
        
    } catch (error) {
        const msg = "error when create comment"
        return res.json({msg})
    }
}

// request remove comment
const remove = async (req, res) =>{
    const id = req.params.id
    try {
        const commentaire = await commentaireService.remove(id)
        const msg = "commentaire supprimé avec succès"
        return res.status(200).json({msg, commentaire})
    } catch (error) {
        const msg = "error when delete comment"
        return res.json({msg, error: error.message})
    }
}

const commentaireController = {
    create,
    remove
}

export default commentaireController