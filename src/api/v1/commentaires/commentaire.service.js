import photoService from "../photos/photos.service.js";
import userService from "../user/user.services.js";
import Commentaire from "./commentaire.model.js"


// creer un commentaire 
const create = async (dataCommentaire) =>{
    
    try {
        if(dataCommentaire.commentaireId){
        const commentaire = await Commentaire.create(dataCommentaire)
            await Commentaire.findByIdAndUpdate(dataCommentaire.commentaireId, {
                $push: {
                    commentaire: commentaire
                }
            })
            return dataCommentaire
        }else{
        const commentaire = await Commentaire.create(dataCommentaire)
            await photoService.update(dataCommentaire.photo, {
            $push : {
              commentaires :  commentaire._id
             }
            });
            return commentaire
        }
    }
     catch (error) {
        throw new Error('please add all the data of commentaire!')
 } }


 // delete commentaire
 const remove = async (id) =>{
    try {
        const commentaire = await Commentaire.findByIdAndDelete(id)
        if(commentaire)
        return commentaire
        return 'commentaire deja supprimé'
    } catch (error) {
        throw new Error('Errir when delete comment')
    }

 }
 const commentaireService = {
    create,
    remove
 }

 export default commentaireService