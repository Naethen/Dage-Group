import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Hook to sync a Supabase table with local React state.
 * Falls back to localStorage data if Supabase fetch fails.
 *
 * @param {string} table - Supabase table name
 * @param {string} localKey - localStorage key for fallback
 * @param {any} fallback - default value if both sources empty
 * @param {object} options - { orderBy: 'id', filters: [] }
 */
export default function useSupabase(table, localKey, fallback = [], options = {}) {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(localKey)
      return cached ? JSON.parse(cached) : fallback
    } catch {
      return fallback
    }
  })
  const [loading, setLoading] = useState(true)

  const { orderBy = 'id', filters = [] } = options

  const fetchData = useCallback(async () => {
    try {
      let query = supabase.from(table).select('*')
      filters.forEach(([col, op, val]) => {
        query = query.filter(col, op, val)
      })
      query = query.order(orderBy, { ascending: true })
      const { data: rows, error } = await query
      if (error) throw error
      setData(rows)
      localStorage.setItem(localKey, JSON.stringify(rows))
    } catch (err) {
      console.warn(`useSupabase(${table}): fetch failed, using cache`, err.message)
    } finally {
      setLoading(false)
    }
  }, [table, localKey, orderBy])

  useEffect(() => { fetchData() }, [fetchData])

  async function insert(row) {
    const { data: inserted, error } = await supabase.from(table).insert(row).select()
    if (error) { console.error(error); return null }
    const newRow = inserted[0]
    setData(prev => {
      const next = [...prev, newRow]
      localStorage.setItem(localKey, JSON.stringify(next))
      return next
    })
    return newRow
  }

  async function update(id, changes) {
    const { error } = await supabase.from(table).update(changes).eq('id', id)
    if (error) { console.error(error); return false }
    setData(prev => {
      const next = prev.map(r => r.id === id ? { ...r, ...changes } : r)
      localStorage.setItem(localKey, JSON.stringify(next))
      return next
    })
    return true
  }

  async function remove(id) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) { console.error(error); return false }
    setData(prev => {
      const next = prev.filter(r => r.id !== id)
      localStorage.setItem(localKey, JSON.stringify(next))
      return next
    })
    return true
  }

  return { data, loading, setData, insert, update, remove, refresh: fetchData }
}
