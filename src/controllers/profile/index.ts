import { Request, Response } from 'express';
import crypto from 'crypto';
import Pet from '../../models/pet';
import User from '../../models/user';
import sequelize from 'sequelize';
type AuthUser = {
    userId: string,
    refresh: boolean,
    iat: number,
    exp: number
} | undefined

export function editProfile(req: Request, res: Response) {
    const user = (req as any | undefined).user;
    if (user) {
        res.send();
    } else {
        res.status(401).send();
    }
}

export function postPet(req: Request, res: Response) {
    const user = (req as any | undefined).user;
    console.log(user, "-- USER -- ");
    if (user) {
        const randomUUID = crypto.randomUUID();
        const { weight, birthday, name } = req.body;
        if (weight && birthday && name) {

            try {
                Pet.create({ id: randomUUID, petName: name, weight, birthday })

                User.update({ pets: sequelize.fn('array_append', sequelize.col('pets'), randomUUID) }, {
                    where: {
                        'id': user.userId
                    }
                })
                return res.send();
            } catch (e) {
                console.log(e);
                return res.status(422).send();
            }

        } else {
            return res.status(422).send();
        }

    } else {
        res.status(401).send();
    }
}

export async function getPets(req: Request, res: Response) {
    const user = (req as any).user as AuthUser
    console.log(user, "user");
    if (!user)
        res.status(422).send();
    else {
        const userProfile = await User.findOne({ where: { id: user.userId } })
        console.log(userProfile);
        if (userProfile) {
            const { dataValues } = userProfile;
            console.log(dataValues.pets);
            const pets = await Pet.findAll({ where: { id: dataValues.pets } })
            if (pets) {
                return res.json(pets)
            }
        }
        res.send();
    }
}

export function postProfile(req: Request, res: Response) {
    const user = (req as any | undefined).user;
    if (user) {
        res.send();
    } else {
        res.status(401).send();
    }
}