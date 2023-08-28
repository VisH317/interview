import prisma from "./prisma"

export default async function checkUpgraded(userid: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: {
            id: userid,
        },
    })

    console.log("checking upgraded")

    if (!user) throw createError("user not found")

    console.log("check")

    return user?.upgraded
}