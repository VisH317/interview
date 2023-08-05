import prisma from "./prisma"

export default async function checkUpgraded(userid: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: {
            id: userid
        }
    })

    if(!user) throw createError("user not found")

    return user?.upgraded
}