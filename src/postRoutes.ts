import { Router } from 'express';
import { getPosts, getPostsByDate, addPost, upvotePost, downvotePost } from './postController';

const router = Router();


router.get('/', getPosts);
router.get('/:date', getPostsByDate);
router.post('/', addPost);
router.put('/upvote/:id', upvotePost);
router.put('/downvote/:id', downvotePost);

export default router;
