import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)
const cleanStdout = (stdout) => stdout.trim().split('\n').filter(Boolean)
export async function fetChengeFile () {
  const { stdout } = await execAsync('git status --porcelain')
  const files = cleanStdout(stdout)
    .map((line) => line.split(' ').at(-1))
    .filter(Boolean)

  return files
}

export async function getStageFiles () {
  const { stdout } = await execAsync('git diff --name-only --cached')
  const files = cleanStdout(stdout)

  return files
}

export async function gitCommit ({ commit = {} }) {
  const { stdout } = await execAsync(`git commit -m "${commit}"`)
  return cleanStdout(stdout)
}

export async function gitAdd (files) {
  const { stdout } = await execAsync('git add .')
  return cleanStdout(stdout)
}

export async function gitPush () {
  const { stdout } = await execAsync('git push')
  return cleanStdout(stdout)
}
