import { env } from "process";
import { z } from 'zod'

interface Env {
    SUPABASE_URL: string,
    SUPABASE_ANON: string
}

const EnvType = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON: z.string()
})

export const useEnv = () => {
    const e: Env = {
        SUPABASE_URL: env.SUPABASE_URL as string,
        SUPABASE_ANON: env.SUPABASE_ANON as string
    }

    const ret = EnvType.parse(e)

    return ret
}