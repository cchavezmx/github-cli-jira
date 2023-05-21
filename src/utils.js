import { outro } from '@clack/prompts'
import colors from 'picocolors'

export function exitProgram ({ message = 'No se creo el commit', code = 0 }) {
  outro(colors.yellow(message))
  process.exit(code)
}
