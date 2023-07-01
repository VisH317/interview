import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: "#000000"       
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}
