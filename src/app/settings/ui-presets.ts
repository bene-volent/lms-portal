
import { definePreset } from '@primeng/themes'
import Material from '@primeng/themes/material';


const color_name = 'blue'

const THEME_PRESET = definePreset(Material, {
    semantic: {
        primary: {
            50: `{${color_name}.50}`,
            100: `{${color_name}.100}`,
            200: `{${color_name}.200}`,
            300: `{${color_name}.300}`,
            400: `{${color_name}.400}`,
            500: `{${color_name}.500}`,
            600: `{${color_name}.600}`,
            700: `{${color_name}.700}`,
            800: `{${color_name}.800}`,
            900: `{${color_name}.900}`,
            950: `{${color_name}.950}`
        },
        colorScheme: {
            light: {
                primary: {
                    color: `{${color_name}.800}`,
                    inverseColor: '#ffffff',
                    hoverColor: `{${color_name}.700}`,
                    activeColor: `{${color_name}.700}`
                },
                highlight: {
                    background: `{${color_name}.800}`,
                    focusBackground: `{${color_name}.700}`,
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            }
        }
    }
});
export { THEME_PRESET }
