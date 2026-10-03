import { CAREER_GOALS, SKILLS, type CareerGoal, type Level, type Skill } from './skillpath-data'
import type { Student } from './student-store'

export type StepStatus = 'done' | 'current' | 'upcoming'

export type RoadmapStep = {
  index: number
  skill: Skill
  status: StepStatus
}

const LEVEL_TIME_FACTOR: Record<Level, number> = {
  Beginner: 1.25,
  Intermediate: 1,
  Advanced: 0.75,
}

export function getCareer(careerId: string): CareerGoal {
  return CAREER_GOALS.find((c) => c.id === careerId) ?? CAREER_GOALS[0]
}

export function getKnownSkillIds(student: Student): Set<string> {
  return new Set([...student.skills, ...student.completed])
}

export function getRoadmap(careerId: string, student?: Student | null): RoadmapStep[] {
  const career = getCareer(careerId)
  const known = student ? getKnownSkillIds(student) : new Set<string>()
  let currentAssigned = false

  return career.roadmap.map((id, index) => {
    const skill = SKILLS[id]
    let status: StepStatus = 'upcoming'
    if (known.has(id)) status = 'done'
    else if (!currentAssigned && student) {
      status = 'current'
      currentAssigned = true
    }
    return { index, skill, status }
  })
}

export function getNextSkill(student: Student): Skill | null {
  return getRoadmap(student.careerGoal, student).find((s) => s.status === 'current')?.skill ?? null
}

export function getProgress(student: Student) {
  const steps = getRoadmap(student.careerGoal, student)
  const done = steps.filter((s) => s.status === 'done').length
  return { done, total: steps.length, percent: Math.round((done / steps.length) * 100) }
}

function joinNames(names: string[]) {
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

export function explainRecommendation(student: Student, skill: Skill): string {
  const career = getCareer(student.careerGoal)
  const doneOnPath = getRoadmap(student.careerGoal, student)
    .filter((s) => s.status === 'done')
    .map((s) => s.skill.shortName)

  if (doneOnPath.length === 0) {
    return `${skill.name} is the foundation of the ${career.name} path, so it is the best place to start. ${skill.reason}`
  }
  return `You already know ${joinNames(doneOnPath)}. ${skill.name} is the next important skill for your ${career.name.toLowerCase()} career. ${skill.reason}`
}

export function estimateHours(skill: Skill, level: Level) {
  return Math.max(2, Math.round(skill.hours * LEVEL_TIME_FACTOR[level]))
}

export function preferenceTip(preference: Student['preference']) {
  switch (preference) {
    case 'videos':
      return 'Start with a full-course video, then pause to code along.'
    case 'notes':
      return 'Read through the key concepts and write short summary notes.'
    case 'practice':
      return 'Jump into the practice tasks and look things up as you go.'
    case 'projects':
      return 'Pick one practice task and grow it into a mini project.'
    case 'combination':
      return 'Watch a short video, skim the notes, then lock it in with a practice task.'
  }
}
