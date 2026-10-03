'use client'

import { useCallback, useSyncExternalStore } from 'react'
import type { Level, Preference } from './skillpath-data'

export type Student = {
  name: string
  level: Level
  skills: string[]
  careerGoal: string
  preference: Preference
  completed: string[]
  streak: number
  lastActiveDate: string | null
  createdAt: string
}

export type StudentProfileInput = Pick<Student, 'name' | 'level' | 'skills' | 'careerGoal' | 'preference'>

// Swap this module for Supabase (or another backend) later; components only use the hook API.
const STORAGE_KEY = 'skillpath-student-v1'
const listeners = new Set<() => void>()
let cache: Student | null | undefined

function readStudent(): Student | null {
  if (cache !== undefined) return cache
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    cache = raw ? (JSON.parse(raw) as Student) : null
  } catch {
    cache = null
  }
  return cache
}

function writeStudent(student: Student | null) {
  cache = student
  if (student) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(student))
  else window.localStorage.removeItem(STORAGE_KEY)
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    cache = undefined
    listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

function nextStreak(student: Pick<Student, 'streak' | 'lastActiveDate'>) {
  const today = todayKey()
  if (student.lastActiveDate === today) return { streak: Math.max(1, student.streak), lastActiveDate: today }
  const yesterday = todayKey(new Date(Date.now() - 86_400_000))
  const streak = student.lastActiveDate === yesterday ? student.streak + 1 : 1
  return { streak, lastActiveDate: today }
}

export const DEMO_STUDENT: StudentProfileInput = {
  name: 'Aarav',
  level: 'Beginner',
  skills: ['html', 'css'],
  careerGoal: 'frontend',
  preference: 'videos',
}

export function useStudent() {
  const snapshot = useSyncExternalStore(subscribe, readStudent, () => undefined)
  const hydrated = snapshot !== undefined
  const student = snapshot ?? null

  const saveProfile = useCallback((input: StudentProfileInput) => {
    const existing = readStudent()
    const keepCompleted = existing?.careerGoal === input.careerGoal ? existing.completed : []
    writeStudent({
      ...input,
      completed: keepCompleted.filter((id) => !input.skills.includes(id)),
      ...nextStreak(existing ?? { streak: 0, lastActiveDate: null }),
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    })
  }, [])

  const markComplete = useCallback((skillId: string) => {
    const existing = readStudent()
    if (!existing || existing.completed.includes(skillId) || existing.skills.includes(skillId)) return
    writeStudent({ ...existing, completed: [...existing.completed, skillId], ...nextStreak(existing) })
  }, [])

  const resetProfile = useCallback(() => writeStudent(null), [])

  return { student, hydrated, saveProfile, markComplete, resetProfile }
}
