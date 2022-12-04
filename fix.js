const fs = require('node:fs')
const { execSync } = require('node:child_process')

const stagedFiles = execSync('git diff --cached --staged --name-only').toString('utf8').trim().split(/\r?\n/)

// Check Gym Data
if (stagedFiles.includes('gyms.json')) {
  const json = fs.readFileSync('gyms.json', 'utf8')
  const gyms = JSON.parse(json)

  // 1. Sort by gym.name
  gyms.sort((a, b) => a.name.localeCompare(b.name))

  // 2. Remove trailing slashes in gym.website
  for (const gym of gyms) {
    if (gym.website.endsWith('/')) gym.website = gym.website.replace(/\/+$/, '')
  }

  const newJson = JSON.stringify(gyms, null, 2)
  if (json.trim() !== newJson.trim()) {
    fs.writeFileSync('gyms.json', json.replace(json.trim(), newJson.trim()))
    execSync('git add gyms.json')
  }

  // 3. Update README
  const apiUsage = {}
  // 3a. Count API Usage
  for (const gym of gyms) {
    const type = gym.api.type[0].toUpperCase() + gym.api.type.slice(1)
    if (apiUsage[type]) {
      apiUsage[type]++
    } else {
      apiUsage[type] = 1
    }
  }
  const APIs = Object.entries(apiUsage).sort((a, b) => b[1] - a[1])

  // 3b. Construct new readme section
  const newLines = []
  newLines.push('## Support', '', `### ${APIs.length} API${APIs.length === 1 ? '' : 's'}`, '')
  for (const [name, count] of APIs) {
    newLines.push(`- [${name}](src/apis/${name.toLowerCase()}.ts) (${count} gym${gyms === 1 ? '' : 's'})`)
  }
  newLines.push('', `### ${gyms.length} Gym${gyms.length === 1 ? '' : 's'}`, '')
  for (const gym of gyms) {
    newLines.push(`- [${gym.name}](${gym.website})`)
  }
  newLines.push('')

  // 3c. Replace
  const readme = fs.readFileSync('README.md', 'utf8')
  const lines = readme.split('\n')
  let differenceDetected = false
  let sectionStart = undefined
  let sectionEnd = undefined
  for (let i = 0; i < lines.length; i++) {
    if (sectionStart === undefined) {
      if (lines[i] === '## Support') {
        sectionStart = i
      }
    } else {
      if (lines[i][0] === '#') {
        sectionEnd = i
        break
      } else {
        if (lines[i] !== newLines[i - sectionStart]) differenceDetected = true
      }
    }
  }
  if (sectionStart === undefined) sectionStart = lines.length
  if (sectionEnd === undefined) sectionStart = lines.length - 1
  if (newLines.length !== sectionEnd - sectionStart || differenceDetected) {
    lines.splice(sectionStart, sectionEnd - sectionStart, ...newLines)
    fs.writeFileSync('README.md', lines.join('\n'))
    execSync('git add README.md')
  }
}
