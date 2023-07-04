import { env } from "process"
import { z } from "zod"

interface Env {
    SUPABASE_URL: string
    SUPABASE_KEY: string
}

const EnvType = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_KEY: z.string(),
})

export const useEnv = () => {
    const e: Env = {
        SUPABASE_URL: env.SUPABASE_URL as string,
        SUPABASE_KEY: env.SUPABASE_KEY as string,
    }

    const ret = EnvType.parse(e)

    return ret
}
