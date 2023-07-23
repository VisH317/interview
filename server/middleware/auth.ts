// protect routes

// export default () => {
//     const user = useSupabaseUser()

//     if (!user) {
//         throw createError({
//             statusCode: 401,
//             message: "Unauthorized",
//         })
//     }
// }

export default defineEventHandler((to, from) => {
    const user = useSupabaseUser()

    if (!user.value) {
        // return navigateTo("/login")
        throw createError({
            statusCode: 401,
            message: "Unauthorized",
        })
    }
    console.log("BLAHBLAHBLAH")
})
