import express from 'express';
export const router = express.Router();
import { getGuilds } from '../bot'

router.put('/guilds/:guildId/prefix', async (req:any, res:any) =>{
    const { prefix } = req.body;
    const { guildId } = req.params;
    console.log(prefix)
    console.log(guildId)
    const update = await getGuilds(guildId, prefix)
    console.log( update )
    res.status(200).send( update);
})