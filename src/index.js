import {
  intro,
  outro,
  text,
  select,
  confirm,
} from '@clack/prompts'
import { COMMITS_TYPES } from './commits-types.js'
import colors from 'picocolors'
import { fetChengeFile, getStageFiles, gitCommit, gitAdd, gitPush } from './git.js'
import { trytm } from "@bdsqqq/try"


const [stageFiles, errorStageFiles] = await trytm(getStageFiles())
const [changeFiles, errorChangeFileds] = await trytm(fetChengeFile())

intro(colors.inverse(`Asistente para la creación de commits semanticos de Jira para ${colors.green(' 99 Minutos ')} \n`))

gitAdd()

if (errorChangeFileds ?? errorStageFiles) {
  outro('Error: Comprueba que estás en un repositorio git')
  process.exit(1)
}


if (stageFiles.length === 0) {
  outro('No hay archivos en el stage')
  process.exit(1)
}

console.log({ changeFiles, stageFiles })


const commitType = await select({
  message: colors.cyan('Seleccione el tipo de commit:'),
  options: Object.entries(COMMITS_TYPES).map(([key, value]) => {
    return {
      value: key,
      label: `${value.emoji} ${key.padEnd(8, " ")} . ${value.description}`
    }
  })
})

let breackingChange = false
const { emoji, release } = COMMITS_TYPES[commitType]

if (release) {
  breackingChange = await confirm({
    initialValue: false,
    message: `${colors.cyan('¿Es un cambio que rompe la compatibilidad?')}

    ${colors.yellow('Si la respuesta es sí, debes crear una nuevo commit con el tipo de commit "breaking change" \n y al hacer release se creará una nueva versión major')}
    
    `
  })
}

const commitMesage = await text({
  message: colors.cyan('Escriba el nombre de la tarea de Jira:'),
  placeholder: 'Ej: PA-1234',
  validate: (value) => {      
      if (value.match(/PA-\d+/) === null) {
        return 'El nombre de la tarea de Jira debe empezar con PA-'
      }      
    }
  })

  const commitComment = await text({
    message: colors.cyan('Escriba un comentario sobre la tarea:'),
    placeholder: 'Ej: Se agrega la funcionalidad de ...',
    validate: (value) => {
      if (!value) {
        return 'El comentario es obligatorio'
      }       
    }
  })


  const timeCommit = await text({
    message: colors.cyan('Escriba el tiempo que le tomó realizar la tarea:'),
    placeholder: 'Ej: 1h 30m',
  })


let commit = `${commitMesage} #comment ${commitComment} #time ${timeCommit} / ${emoji} ${commitType}: `
commit = breackingChange ? `${commit} \n\n BREAKING CHANGE: ${commitMesage}` : commit

const shouldContinue = await confirm({
  initialValue: true,
  message: `¿Estás seguro de crear el commit con el mensaje ${colors.green(commit)}?`,
})


if (!shouldContinue) {
  outro('commit cancelado')
  process.exit(1)
}

await gitCommit({ commit })
console.log(commitMesage)

outro(
  colors.green('✅ commit creado correctamente'))
