import prisma from "../lib/prisma.js";

export const getPosts=async(req,res)=>{
    try {
        const posts=await prisma.post.findMany()
        res.status(200).json(posts)
    } catch (error) {
        console.log('Get Posts',error);
        res.status(500).json({message:'Failed to get Posts'})
    }
}


export const getPost=async(req,res)=>{
    const id=req.params.id
    try {
        const post=await prisma.post.findUnique({
            where:{id},
            include:{
                postDetail:true,
                user:{
                    select:{
                        username:true,
                        avatar:true
                    }
                }
            }
        })

        res.status(200).json(post)
    } catch (error) {
        console.log('Get Post',error);
        res.status(500).json({message:'Failed to get Post'})
    }
}

export const addPost=async(req,res)=>{

    const body=req.body;
    const tokenId=req.userId;

    try {
        const newPost=await prisma.post.create({
            data:{
                ...body.postData,
                userId:tokenId,
                postDetail:{
                    create:body.postDetail,
                }
            }
        })
        res.status(200).json(newPost)
    } catch (error) {
        console.log('Add Posts',error);
        res.status(500).json({message:'Failed to add Post'})
    }
}

export const updatePost=(req,res)=>{
    try {
        
        res.status(200).json()
    } catch (error) {
        console.log('Update Post',error);
        res.status(500).json({message:'Failed to update Post'})
    }
}

export const deletePost=async(req,res)=>{
    const id=req.params.id
    const tokenUserId=req.userId
    try {
        const post = await prisma.post.findUnique({
            where:{id}
        })
        if(post.userId !== tokenUserId){
            res.status(403).json({message:'Not Authorized'})
        }

        await prisma.post.delete({
            where:{id}
        })

        res.status(200).json({message:'Post Deleted'})
    } catch (error) {
        console.log('Delete Posts',error);
        res.status(500).json({message:'Failed to delete Post'})
    }
}